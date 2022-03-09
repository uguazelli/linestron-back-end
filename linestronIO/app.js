// Express JS
const express = require("express");
const app = require("express")();
// Socket IO
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*", methods: ["GET", "POST"] } });
const registerRoomHandlers = require("./handlers/room");
// Routes Import
const roomRouter = require("./routes/room");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const companyRouter = require("./routes/company");
// Other Imports
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const listEndpoints = require("express-list-endpoints");

// const { Socket } = require("socket.io");

const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize({ dialect: "sqlite", storage: "./database.db" });
const { User } = require("./models/User");
const { Company } = require("./models/Company");
const { UserCompany } = require("./models/UserCompany");
const { Room } = require("./models/Room");

// Cors
const corsOptions = {
	origin: "http://localhost:19006",
	credentials: true,
	optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

// Middlewares

app.use(express.static("public"));
app.use(cookieParser());
app.use(session({ secret: "kj430898fsk23985$093j0ndiy", resave: false, saveUninitialized: true }));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/room", roomRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/company", companyRouter);

app.get("/", (req, res, next) => res.json(listEndpoints(app)));

// Socket IO
io.on("connection", (socket) => {
	registerRoomHandlers(io, socket);
});
io.on("connection_error", (err) => {
	console.log(err.req); // the request object
	console.log(err.code); // the error code, for example 1
	console.log(err.message); // the error message, for example "Session ID unknown"
	console.log(err.context); // some additional error context
});

// Start App
http.listen(3000, function () {
	console.log("listening on *:3000");
});

app.get("/testinsertdb", async (req, res, next) => {
	try {
		const zelli = await Company.create({ name: "Tron", slug: "tron", account_expire_date: "20200202" });
		console.log("Zelli's auto-generated ID:", zelli.id);
		return res.json({ ok: true });
	} catch (error) {
		return res.json({ ok: false });
	}
});

const syncDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}

	// 	await sequelize.sync({ force: true });
	// 	// the defined model is the class itself
	// 	console.log(Company === sequelize.models.Company); // true

	// await User.sync({ force: true });
	// await Company.sync({ force: true });
	// await UserCompany.sync({ force: true });
	// await Room.sync({ force: true });
	// await sequelize.sync({ force: true });
};

syncDB();
