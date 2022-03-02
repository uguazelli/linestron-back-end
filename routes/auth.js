const express = require("express");
const router = express.Router();
const path = require("path");
const templatesPath = path.join(__dirname, "../templates");
var constants = require("../constants");
// Firebase
const firebaseapp = require("firebase/app");
const firebaseAuth = require("firebase/auth");
const app = firebaseapp.initializeApp(constants.firebaseConfig);
const auth = firebaseAuth.getAuth();

// Routes
router.get("/loggeduser", function (req, res, next) {
	if (req.session.email == undefined) {
		return res.json({ ok: false });
	} else return res.json({ ok: true, user: req.session.email });
});
router.get("/register", function (req, res, next) {
	res.sendFile(templatesPath + "/register.html");
});

router.post("/register", async (req, res, next) => {
	await firebaseAuth
		.createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			req.session.email = user.email;
			return res.json(user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			return res.json(error.message);
		});
});

router.get("/login", function (req, res, next) {
	res.sendFile(templatesPath + "/login.html");
});

router.post("/login", async (req, res, next) => {
	await firebaseAuth
		.signInWithEmailAndPassword(auth, req.body.email, req.body.password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			req.session.email = user.email;
			return res.json({ ok: true, user: user.email });
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			return res.json(error.message);
		});
});

router.get("/logout", function (req, res, next) {
	req.session.email = null;
	res.sendFile(templatesPath + "/login.html");
});

module.exports = router;
