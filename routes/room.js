var express = require("express");
var router = express.Router();

const path = require("path");
const templatesPath = path.join(__dirname, "../templates");

/* GET home page. */
router.get("/:room", function (req, res, next) {
	console.log(req.params);
	res.sendFile(templatesPath + "/room.html");
});

module.exports = router;
