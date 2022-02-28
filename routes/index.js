var express = require("express");
var router = express.Router();

const path = require("path");
const templatesPath = path.join(__dirname, "../templates");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.sendFile(templatesPath + "/index.html");
});

module.exports = router;
