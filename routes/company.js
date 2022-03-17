const express = require("express");
const router = express.Router();
const path = require("path");
const templatesPath = path.join(__dirname, "../templates");

const queries = require("../queries");
const db = queries.DB;

router.get("/", async (req, res, next) => {
	let stmt = db.prepare(queries.COMPANY_GET_BY_ID);
	let row = stmt.get(req.session.email, req.session.companyId);
	return res.json(row);
});

router.post("/", async (req, res, next) => {
	let stmt = db.prepare(queries.COMPANIES_UPDATE_BY_ID);
	let update = stmt.run(req.body.name, req.body.slug, req.session.companyId);
	return res.json(update);
});

router.get("/:companySlug/room/:roomUniqueName", (req, res, next) => {
	res.sendFile(templatesPath + "/room.html");
});

router.get("/byemail", async (req, res, next) => {
	let email = req.session.email;
	let stmt = db.prepare(queries.COMPANIES_GET_BY_EMAIL);
	let rows = stmt.all(email);
	return res.json(rows);
});

module.exports = router;
