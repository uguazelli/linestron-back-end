const express = require("express");
const router = express.Router();
var constants = require("../constants");
const queries = require("../queries");
const db = queries.DB;
// Firebase
const firebaseapp = require("firebase/app");
const firebaseAuth = require("firebase/auth");
const { authUsers } = require("../util");
const app = firebaseapp.initializeApp(constants.firebaseConfig);
const auth = firebaseAuth.getAuth();

// Routes
router.get("/loggeduser", (req, res, next) => {
	if (req.session.email == undefined) {
		return res.json({ ok: false });
	} else return res.json({ ok: true, user: req.session.email });
});

router.get("/authType/company/:companySlug", (req, res, next) => {
	let result = res.json(authUsers(req.session.email, req.params.companySlug));
	return result;
});

router.post("/login", async (req, res, next) => {
	await firebaseAuth
		.signInWithEmailAndPassword(auth, req.body.email, req.body.password)
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

router.get("/logout", (req, res, next) => {
	req.session.email = null;
	return res.json({ ok: true });
});

module.exports = router;
