module.exports = (io, socket) => {
	var lastRoomMessage = {};

	socket.on("disconnect", function () {
		console.log("A user disconnected");
	});

	// Join Room
	socket.on("connectToRoom", (room) => {
		socket.join(room);
		io.emit(room, lastRoomMessage[room]);
		console.log("Joing room", room);
	});

	// Emit to Room
	socket.on("emmitToRoom", (msg) => {
		lastRoomMessage[msg.room] = msg.value;
		io.emit(msg.room, msg.value);
		console.log(msg);
	});
};
