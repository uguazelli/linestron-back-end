const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
const cors = require("cors");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
// Routes Import
const indexRouter = require("./routes/index");
const roomRouter = require("./routes/room");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
// IO imports
const registerRoomHandlers = require("./handlers/room");

app.use(cors());
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({ secret: "kj430898fsk23985$093j0ndiy", resave: false, saveUninitialized: true }));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use("/", indexRouter);
app.use("/room", roomRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

io.on("connection", (socket) => {
	registerRoomHandlers(io, socket);
});
io.on("connection_error", (err) => {
	console.log(err.req); // the request object
	console.log(err.code); // the error code, for example 1
	console.log(err.message); // the error message, for example "Session ID unknown"
	console.log(err.context); // some additional error context
});

http.listen(3000, function () {
	console.log("listening on *:3000");
});
