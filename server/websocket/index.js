const WebSocket = require('ws');

const { WebSocketServer } = WebSocket;

const wss = new WebSocketServer({
  noServer: true,
  clientTracking: false,
});

const usersMap = new Map();

wss.on('connection', (ws, req) => {
  const { company } = req.session;

  usersMap.set(company.id, { company, ws });

  ws.on('message', (msg) => {
    const message = JSON.parse(msg);

    const { type, payload } = message;

    const sender = usersMap.get(company.id);

    switch (type) {
      case 'message':
        sender.ws.send(JSON.stringify({ ...message, auth: true }));
        break;
      case 'open':
        sender.ws.send(JSON.stringify({ ...message, fromServer: true }));
        break;

      default:
        break;
    }
  });
});

module.exports = wss;
