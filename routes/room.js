const express = require("express");
const router = express.Router();
const constants = require("../constants");
const axios = require("axios");
const twilio = require("twilio");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = require("../constants");
const queries = require("../queries");
const { authUsers } = require("../util");
const db = queries.DB;
// firestore
const { initializeApp, doc, getDoc, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore");
initializeApp({ credential: cert(constants.firestoreCredential) });
const firestoreDb = getFirestore();

const persistnumber = async (companySlug, roomUniqueName, number) => {
	const numberId = `${companySlug}_${roomUniqueName}_${number}`;
	const docRef = firestoreDb.collection("numbersID").doc(numberId);
	await docRef.set({
		numberId: numberId,
		number: number,
		company: companySlug,
		room: roomUniqueName,
		clientPhone: "",
		status: "open",
		createdAt: Date().toString(),
	});
	return { ok: true };
};

const getPersistednumber = async (companySlug, roomUniqueName, number) => {
	// collection = numbersID
	const id = `${companySlug}_${roomUniqueName}_${number}`;
	let docRef = firestoreDb.collection("numbersID").doc(id);
	let doc = await docRef.get();
	if (doc.exists) {
		console.log("Document data:", doc.data());
	} else {
		// doc.data() will be undefined in this case
		console.log("No such document!");
	}

	return { ok: true, message: doc.data() };
};

const sendSms = (phone, msg) => {
	const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
	const from = TWILIO_PHONE_NUMBER;
	const to = phone;
	const body = msg;
	client.messages.create({ body: body, from: from, to: to }).then((message) => console.log(message.sid));
	return { ok: true };
};

// router.post("/sms/send/company/:company_name", async (req, res, next) => {
// 	const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
// 	const from = TWILIO_PHONE_NUMBER;
// 	const to = req.body.phoneNumber;
// 	const body = `Hey there, we are almost ready!!! ${req.params.company_name} is waiting for you!`;
// 	client.messages.create({ body: body, from: from, to: to }).then((message) => console.log(message.sid));
// 	return res.json({ ok: true });
// });

//role = (admin, user)
router.post("/:role/company/:companyId", async (req, res, next) => {
	let email = req.body.user.email;
	const stmt = db.prepare(queries.ROOMS_BY_COMPANY_ID);
	const rows = stmt.all(req.params.role, req.params.companyId, email);
	return res.json(rows);
});

//role = (admin, user)
router.post("/:role/admCompany", async (req, res, next) => {
	let email = req.body.user.email;
	let companyId = req.body.companyId;
	const stmt = db.prepare(queries.ROOMS_BY_COMPANY_ID);
	const rows = stmt.all(req.params.role, companyId, email);
	return res.json(rows);
});

router.post("/:roomID", async (req, res, next) => {
	let execute;
	if (req.params.roomID == 0) {
		let stmt = db.prepare(queries.ROOMS_INSERT);
		execute = stmt.run(req.body.name, req.body.unique_name, req.body.prefix, req.body.companyId);
	} else {
		let stmt = db.prepare(queries.ROOMS_UPDATE_BY_ID);
		execute = stmt.run(req.body.name, req.body.unique_name, req.body.prefix, req.params.roomID);
	}
	return res.json(execute);
});

router.delete("/:roomID", async (req, res, next) => {
	let stmt = db.prepare(queries.ROOMS_DELETE);
	let execute = stmt.run(req.params.roomID);
	return res.json(execute);
});

router.put("/:roomID", async (req, res, next) => {
	let stmt = db.prepare(queries.ROOMS_RESET_BY_ID);
	let execute = stmt.run(req.params.roomID);
	return res.json(execute);
});

// Get last number
router.get("/:roomUniqueName/current", async (req, res, next) => {
	let getRoom = db.prepare(queries.ROOMS_GET_CURRENT_BY_ROOM_UNIQUE_NAME);
	let room = getRoom.get(req.params.roomUniqueName);
	return res.json(room);
});

// update current
router.post("/:roomUniqueName/current", async (req, res, next) => {
	let user = req.body.user;
	let number = req.body.number;
	let roomUniqueName = req.params.roomUniqueName;
	// Get Company
	let companystmt = db.prepare(queries.COMPANY_GET_BY_ID);
	let company = companystmt.get(user.user.email, req.body.companyId);
	// Update Number
	let stmt = db.prepare(queries.ROOMS_UPDATE_CURRENT_BY_ROOM_UNIQUE_NAME);
	let update = stmt.run(number, roomUniqueName);
	let previous3 = number >= 3 ? number - 3 : number;
	const persisted = await getPersistednumber(company.slug, roomUniqueName, previous3);
	if (persisted.message !== undefined) {
		const phone = persisted.message.clientPhone;
		if (phone !== "") {
			console.log("send sms");
			let msg = `Hey there, we are almost ready!!! ${company.name} is waiting for you!`;
			const sendSmsMsg = sendSms(phone, msg);
		}
	}
	return res.json(update);
});

// Update Phone Number
router.post("/client/phone", async (req, res, next) => {
	const id = req.body.id;
	const phone = req.body.phone;
	const docRef = await firestoreDb.collection("numbersID").doc(id);
	const result = await docRef.update({ clientPhone: phone });
	return res.json(result);
});

// create new number
router.get("/:roomUniqueName/company/:companySlug/number/:number?", async (req, res, next) => {
	let companySlug = req.params.companySlug;
	let roomUniqueName = req.params.roomUniqueName;
	let number = req.params.number;
	// 1 - Get last number generated
	let getRoom = db.prepare(queries.ROOMS_GET_CURRENT_NUMBER);
	let room = getRoom.get(companySlug, roomUniqueName);
	// 2 - Check if number is in the request otherwise sum 1

	if (number) {
		if (req.session.email == undefined) return res.json({ ok: false, message: "user not logged in" });
		let userRole = await authUsers(req.session.email, companySlug);
		if (!["admin", "user"].includes(userRole)) return res.json({ ok: false, message: "user not allowed" });
		number = parseInt(number);
	} else number = room.roomLastNumber + 1;
	// 3 - Update rooms table with new number
	let stmt = db.prepare(queries.ROOMS_UPDATE_LAST_NUMBER);
	let update = stmt.run(number, room.id);
	let firebaseResult = await persistnumber(companySlug, roomUniqueName, number);
	// 4 - Get company name, room name and last created number
	let getStmt = db.prepare(queries.ROOMS_GET_LAST_BY_ROOM_ID);
	let row = getStmt.get(room.id);
	// 5 - Update Room Admin
	axios
		.post(constants.IO_SERVER + "/lastnumber", {
			roomId: row.roomId,
			numberGenerated: row.roomLastNumber,
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});

	// 6 - Return json
	return res.json(row);
});

module.exports = router;
