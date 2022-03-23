const express = require("express");
const router = express.Router();
const queries = require("../queries");
const db = queries.DB;

// Routes

router.post("/", async (req, res, next) => {
	let stmt = db.prepare(queries.COMPANIES_UPDATE_BY_ID);
	let update = stmt.run(req.body.data.name, req.body.data.slug, req.body.companyId);
	return res.json(update);
});

router.post("/byId", async (req, res, next) => {
	let email = req.body.user.email;
	let companyId = req.body.companyId;
	let stmt = db.prepare(queries.COMPANY_GET_BY_ID);
	let row = stmt.get(email, companyId);
	return res.json(row);
});

router.post("/byemail", async (req, res, next) => {
	let email = req.body.user.email;
	let stmt = db.prepare(queries.COMPANIES_GET_BY_EMAIL);
	let rows = stmt.all(email);
	return res.json(rows);
});

module.exports = router;
