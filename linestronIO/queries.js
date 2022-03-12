const Database = require("better-sqlite3");
const db = new Database("./database.db", { verbose: console.log });

module.exports = Object.freeze({
	DB: db,
	COMPANY_GET_BY_ID: `SELECT uc.CompanyId, c.name, c.slug, uc."role", u.id ,u.email, uc.UserId FROM UserCompanies uc LEFT JOIN Users u ON uc.UserId = u.id LEFT JOIN Companies c ON c.id = uc.CompanyId WHERE uc."role" = 'admin' and u.email = ? and uc.CompanyId = ?`,
	COMPANIES_GET_BY_EMAIL: `SELECT uc.CompanyId, c.name, c.slug, uc."role", u.id ,u.email, uc.UserId FROM UserCompanies uc LEFT JOIN Users u ON uc.UserId = u.id LEFT JOIN Companies c ON c.id = uc.CompanyId WHERE uc."role" = 'admin' and u.email = ?`,
	COMPANIES_UPDATE_BY_ID: `UPDATE Companies SET name = ?, slug = ? WHERE id = ?`,
	ROOMS_BY_COMPANY_ID: `SELECT r.* FROM Rooms r, Companies c, UserCompanies uc, Users u WHERE r.CompanyId = c.id  AND c.id = uc.CompanyId AND uc.UserId = u.id AND uc."role" in ('admin', ?) AND c.id = ? AND u.email = ?`,
	ROOMS_UPDATE_BY_ID: `UPDATE Rooms SET name = ?, unique_name = ? WHERE id = ?`,
});
