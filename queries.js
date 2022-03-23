const Database = require("better-sqlite3");
const db = new Database("./database.db", { verbose: console.log });

module.exports = Object.freeze({
	DB: db,
	USERS_GET_AUTH_BY_COMAPNY: `SELECT uc.* FROM Companies c, UserCompanies uc, Users u WHERE u.id = uc.UserId AND uc.CompanyId = c.id AND u.email = ? AND c.slug = ?`,
	COMPANY_GET_BY_ID: `SELECT uc.CompanyId, c.name, c.slug, uc."role", u.id ,u.email, uc.UserId FROM UserCompanies uc LEFT JOIN Users u ON uc.UserId = u.id LEFT JOIN Companies c ON c.id = uc.CompanyId WHERE uc."role" = 'admin' and u.email = ? and uc.CompanyId = ?`,
	COMPANIES_GET_BY_EMAIL: `SELECT uc.CompanyId, c.name, c.slug, uc."role", u.id ,u.email, uc.UserId FROM UserCompanies uc LEFT JOIN Users u ON uc.UserId = u.id LEFT JOIN Companies c ON c.id = uc.CompanyId WHERE uc."role" = 'admin' and u.email = ?`,
	COMPANIES_UPDATE_BY_ID: `UPDATE Companies SET name = ?, slug = ? WHERE id = ?`,
	ROOMS_BY_COMPANY_ID: `SELECT c.name AS 'companyName', c.slug AS 'companySlug', r.* FROM Rooms r, Companies c, UserCompanies uc, Users u WHERE r.CompanyId = c.id  AND c.id = uc.CompanyId AND uc.UserId = u.id AND uc."role" in ('admin', ?) AND c.id = ? AND u.email = ?`,
	ROOMS_UPDATE_BY_ID: `UPDATE Rooms SET name = ?, unique_name = ? WHERE id = ?`,
	ROOMS_UPDATE_LAST_NUMBER: `UPDATE Rooms SET lastNumber=? WHERE id=?;`,
	ROOMS_GET_CURRENT_NUMBER: `SELECT r.id , r.lastNumber as 'roomLastNumber' FROM Companies c , Rooms r WHERE r.CompanyId = c.id AND c.slug = ? AND r.unique_name = ?`,
	ROOMS_GET_LAST_BY_ROOM_ID: `SELECT c.id as 'companyId', c.name as 'companyName', c.slug as 'companySlug', r.id as 'roomId', r.name as 'roomName', r.unique_name as 'roomUniqueName', r.lastNumber as 'roomLastNumber' FROM Companies c , Rooms r WHERE r.CompanyId = c.id and r.id = ?`,
	ROOMS_GET_CURRENT_BY_ROOM_UNIQUE_NAME: `SELECT * FROM Rooms WHERE unique_name = ?`,
	ROOMS_UPDATE_CURRENT_BY_ROOM_UNIQUE_NAME: `UPDATE Rooms SET currentNumber = ? WHERE unique_name = ?`,
});
