/* eslint-disable no-case-declarations */
const WebSocket = require('ws');

const { WebSocketServer } = WebSocket;

const { Message } = require('../db/models');

const wss = new WebSocketServer({
  noServer: true,
  clientTracking: false,
});

wss.on('connection', (ws, req, usersMap, wsClientMap) => {
  const { company } = req.session;

  usersMap.set(company.id, { company, ws });

  ws.on('message', (msg) => {
    const message = JSON.parse(msg);

    const { type, payload } = message;

    const sender = usersMap.get(company.id);
    const reciever = usersMap.get(payload.chatWithUser);

    switch (type) {
      case 'message':
        Message.create({
          text: payload.text,
          user_from: payload.user_from,
          user_to: payload.user_to,
        })
          .then((newMessage) => {
            if (sender && reciever) {
              sender.ws.send(JSON.stringify({ type: 'message', payload: { ...newMessage.get(), auth: true } }));
              reciever.ws.send(JSON.stringify({ type: 'message', payload: newMessage }));
            } else {
              sender.ws.send(JSON.stringify({ type: 'message', payload: { ...newMessage.dataValues, auth: true } }));
              sender.ws.send(JSON.stringify({ type: 'offline' }));
            }
          })
          .catch(console.log);

        break;
      case 'open':

        const user = payload;
        const userArray = [];

        wsClientMap.set(user.id, { ws, user });

        wsClientMap.forEach(
          (connection) => {
            userArray.push(connection.user.id);
            if (user.id !== connection.user.id) {
              connection.ws.send(JSON.stringify({ type: 'new_connection', payload: user.id }));
            }
            connection.ws.send(JSON.stringify({ type: 'all_connections', payload: userArray }));
          },
        );

        break;

      default:
        break;
    }
  });
  ws.on('close', (msg) => {
    const userArray = [];
    wsClientMap.delete(company.id);
    wsClientMap.forEach(
      (connection) => {
        userArray.push(connection.user.id);
        connection.ws.send(JSON.stringify({ type: 'some_close', payload: userArray }));
      },
    );

    const message = JSON.parse(msg);
    usersMap.delete(company.id);
    const receiver = usersMap.get(+message.chatWithUser);
    if (receiver) {
      receiver.ws.send(JSON.stringify({ type: 'offline' }));
    }
  });
});

module.exports = wss;
