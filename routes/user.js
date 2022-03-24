const express = require("express");
const router = express.Router();
const queries = require("../queries");
const db = queries.DB;

// Routes
router.post("/company/:companyId", async (req, res, next) => {
	let stmt = db.prepare(queries.USERS_GET_BY_COMPANY_ID);
	let row = stmt.all(req.params.companyId);
	return res.json(row);
});

router.put("/", async (req, res, next) => {
	if (req.body.id == 0) {
		//insert
		//user
		let insertUser = db.prepare(queries.USERS_INSERT);
		let user = insertUser.run(req.body.email);
		//user role
		let insertUserRole = db.prepare(queries.USERS_COMPANY_INSERT);
		let userRole = insertUserRole.run(req.body.role, user.lastInsertRowid, req.body.companyId);
		return res.json([user, userRole]);
	} else {
		//update
		//user
		let updateUser = db.prepare(queries.USERS_UPDATE_BY_ID);
		let user = updateUser.run(req.body.email, req.body.id);
		//user role
		let updateUserRole = db.prepare(queries.USERS_COMPANY_UPDATE_BY_ID);
		let userRole = updateUserRole.run(req.body.role, req.body.id);
		return res.json([user, userRole]);
	}
});

router.delete("/", async (req, res, next) => {
	//user
	let deleteUser = db.prepare(queries.USERS_DELETE_BY_ID);
	let user = deleteUser.run(req.body.id);
	//user role
	let deleteUserCompany = db.prepare(queries.USERS_DELETE_BY_ID_AND_COMPANY_ID);
	let userCompany = deleteUserCompany.run(req.body.id, req.body.company_id);
	return res.json([user, userCompany]);
});

module.exports = router;
