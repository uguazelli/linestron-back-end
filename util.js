const queries = require("./queries");
const db = queries.DB;

module.exports.authUsers = (email, companySlug) => {
	if (email == undefined) {
		return { ok: false, message: "user not logged in" };
	} else {
		let stmt = db.prepare(queries.USERS_GET_AUTH_BY_COMAPNY);
		let user = stmt.get(email, companySlug);
		try {
			return user.role;
		} catch (error) {
			return { ok: false, message: error };
		}
	}
};
