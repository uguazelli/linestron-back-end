const { async } = require("@firebase/util");
const express = require("express");
const router = express.Router();
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore");
const path = require("path");
const templatesPath = path.join(__dirname, "../templates");
// firestore
const serviceAccount = require("../linestron-app-a90c1aa156b0.json");
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// middleware
router.use((req, res, next) => {
	if (req.session.email === undefined || req.session.email === null) {
		res.redirect("/auth/login");
		return;
	}
	next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
	res.sendFile(templatesPath + "/admin.html");
});

router.post("/company", async (req, res, next) => {
	try {
		// Add a new document with a generated id.
		const docRef = await db.collection("companies").add({
			company_name: req.body.company_name,
			company_unique_name: req.body.company_unique_name,
			users: [
				{
					email: req.session.email,
					type: "admin",
				},
			],
		});

		await db.collection("users").add({
			email: req.session.email,
			companies: [
				{
					company_doc_id: docRef.id,
					rooms: [
						{
							name: "sala1",
							description: "unique room",
						},
					],
				},
			],
		});

		// const docRef = db.collection("companies").doc(req.body.company_unique_name);
		// await docRef.set({
		// 	company_name: req.body.company_name,
		// 	company_unique_name: req.body.company_unique_name,
		// 	users: [
		// 		{
		// 			email: req.session.email,
		// 			type: "admin",
		// 		},
		// 	],
		// });
		return res.json({ status: "ok" });
	} catch (error) {
		return res.json({ status: "fail" });
	}
});

router.get("/firestore/read", function (req, res, next) {
	read();
});

const read = async () => {
	console.log("starting read");
	const snapshot = await db.collection("users").get();
	snapshot.forEach((doc) => {
		console.log(doc.id, "=>", doc.data());
	});
};

module.exports = router;
