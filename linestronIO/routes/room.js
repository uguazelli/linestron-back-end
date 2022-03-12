const express = require("express");
const router = express.Router();
const queries = require("../queries");
const db = queries.DB;

//role = (admin, user)
router.get("/:role/company", async (req, res, next) => {
	const stmt = db.prepare(queries.ROOMS_BY_COMPANY_ID);
	const rows = stmt.all(req.params.role, req.session.companyId, req.session.email);
	return res.json(rows);
});

router.post("/:roomID", async (req, res, next) => {
	let stmt = db.prepare(queries.ROOMS_UPDATE_BY_ID);
	let update = stmt.run(req.body.name, req.body.unique_name, req.params.roomID);
	return res.json(update);
});

module.exports = router;
