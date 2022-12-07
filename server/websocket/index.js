const WebSocket = require('ws');

const { WebSocketServer } = WebSocket;

const wss = new WebSocketServer({
  noServer: true,
  clientTracking: false,
});

const usersMap = new Map();

wss.on('connection', (ws, req) => {
  const { user } = req.session;

  usersMap.set(user.id, { user, ws });

  //   message => {type: String, payload: Object};
  ws.on('message', (msg) => {
    const message = JSON.parse(msg);
    console.log(message);

    const { type, payload } = message;

    const sender = usersMap.get(user.id);
    sender.ws.send(JSON.stringify({ ...message, fromServer: true }));

    switch (type) {
      case 'message':

        break;
      case 'open':

        break;

      default:
        break;
    }
  });
});

module.exports = wss;
