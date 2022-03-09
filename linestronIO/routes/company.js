const express = require("express");
const router = express.Router();
const { Company } = require("../models/Company");
const { User } = require("../models/User");

/* GET home page. */
router.get("/byemail", async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				email: req.session.email,
			},
			include: [
				{
					model: Company,
					required: true,
				},
			],
		});

		let admCompanies = user.Companies.filter(function (e) {
			return e.UserCompany.role === "admin";
		});

		return res.json(admCompanies);
	} catch (error) {
		return res.json({ ok: false, message: "User not logged in" });
	}
});

module.exports = router;
