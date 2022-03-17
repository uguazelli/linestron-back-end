const { async } = require("@firebase/util");
const express = require("express");
const router = express.Router();
const constants = require("../constants");
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore");

// firestore
initializeApp({ credential: cert(constants.firestoreCredential) });
const db = getFirestore();

// middleware
router.use((req, res, next) => {
	if (req.session.email === undefined || req.session.email === null) {
		res.redirect("/auth/login");
		return;
	}
	next();
});

router.get("/session/company/:companyID", async (req, res, next) => {
	req.session.companyId = req.params.companyID;
	return res.json({ ok: true });
});

module.exports = router;
