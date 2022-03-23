const express = require("express");
const router = express.Router();
const constants = require("../constants");

// middleware
// router.use((req, res, next) => {
// 	if (req.session.email === undefined || req.session.email === null) {
// 		return res.json({ ok: false, message: "user not logged in" });
// 	}
// 	next();
// });

router.get("/session/company/:companyID", async (req, res, next) => {
	req.session.companyId = req.params.companyID;
	return res.json({ ok: true });
});

module.exports = router;
