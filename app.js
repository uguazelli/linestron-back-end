// Express JS
const express = require("express");
const app = require("express")();
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
const { corsOrigin } = require("./constants");

// Cors
const corsOptions = {
	origin: corsOrigin,
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

// Start App
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log("listening on *:3000");
});
