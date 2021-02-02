const Websocket = require('ws');

const wss = new Websocket.Server({ port: 8080 });

let userList = [];

wss.on('connection', (ws) => {
	console.log('new connection');
	userList.push(ws);

	ws.send(JSON.stringify('hello from the server!'));

	ws.onmessage = (message) => {
		const data = JSON.parse(message.data);

		for (let i = 0; i < userList.length; i++) {
			userList[i].send(
				JSON.stringify({
					method: data.method,
					position: data.position,
					newUrl: data.newUrl,
				})
			);
		}
	};

	wss.on('close', () => {
		console.log('connection closed');
	});
});
