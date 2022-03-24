const Database = require("better-sqlite3");
const db = new Database("./database.db", { verbose: console.log });

module.exports = Object.freeze({
	DB: db,
	USERS_GET_BY_COMPANY_ID: `SELECT u.*, uc.* FROM Users u , UserCompanies uc WHERE u.id = uc.UserId  AND uc.CompanyId = ?`,
	USERS_GET_AUTH_BY_COMAPNY: `SELECT uc.* FROM Companies c, UserCompanies uc, Users u WHERE u.id = uc.UserId AND uc.CompanyId = c.id AND u.email = ? AND c.slug = ?`,
	USERS_UPDATE_BY_ID: `UPDATE Users SET email = ? WHERE id = ?`,
	USERS_COMPANY_UPDATE_BY_ID: `UPDATE UserCompanies SET "role" = ? WHERE UserId = ?`,
	USERS_DELETE_BY_ID: `DELETE FROM Users WHERE id = ?`,
	USERS_DELETE_BY_ID_AND_COMPANY_ID: `DELETE FROM UserCompanies WHERE UserId = ? AND CompanyId = ?`,
	USERS_INSERT: `INSERT INTO Users  (email, createdAt, updatedAt) VALUES(?, (SELECT datetime()), (SELECT datetime()))`,
	USERS_COMPANY_INSERT: `INSERT INTO UserCompanies ("role", createdAt, updatedAt, UserId, CompanyId) VALUES(?, (SELECT datetime()), (SELECT datetime()), ?, ?)`,
	COMPANY_GET_BY_ID: `SELECT uc.CompanyId, c.name, c.slug, uc."role", u.id ,u.email, uc.UserId FROM UserCompanies uc LEFT JOIN Users u ON uc.UserId = u.id LEFT JOIN Companies c ON c.id = uc.CompanyId WHERE uc."role" = 'admin' and u.email = ? and uc.CompanyId = ?`,
	COMPANIES_GET_BY_EMAIL: `SELECT uc.CompanyId, c.name, c.slug, uc."role", u.id ,u.email, uc.UserId FROM UserCompanies uc LEFT JOIN Users u ON uc.UserId = u.id LEFT JOIN Companies c ON c.id = uc.CompanyId WHERE uc."role" = 'admin' and u.email = ?`,
	COMPANIES_UPDATE_BY_ID: `UPDATE Companies SET name = ?, slug = ? WHERE id = ?`,
	ROOMS_BY_COMPANY_ID: `SELECT c.name AS 'companyName', c.slug AS 'companySlug', r.* FROM Rooms r, Companies c, UserCompanies uc, Users u WHERE r.CompanyId = c.id  AND c.id = uc.CompanyId AND uc.UserId = u.id AND uc."role" in ('admin', ?) AND c.id = ? AND u.email = ?`,
	ROOMS_UPDATE_BY_ID: `UPDATE Rooms SET name = ?, unique_name = ? WHERE id = ?`,
	ROOMS_INSERT: `INSERT INTO Rooms (name, unique_name, prefix, sufix, createdAt, updatedAt, CompanyId, lastNumber, currentNumber) VALUES(?, ?, '', '', (SELECT datetime()), (SELECT datetime()), ?, 0, 0);`,
	ROOMS_DELETE: `DELETE FROM Rooms WHERE id = ?`,
	ROOMS_UPDATE_LAST_NUMBER: `UPDATE Rooms SET lastNumber=? WHERE id=?;`,
	ROOMS_GET_CURRENT_NUMBER: `SELECT r.id , r.lastNumber as 'roomLastNumber' FROM Companies c , Rooms r WHERE r.CompanyId = c.id AND c.slug = ? AND r.unique_name = ?`,
	ROOMS_GET_LAST_BY_ROOM_ID: `SELECT c.id as 'companyId', c.name as 'companyName', c.slug as 'companySlug', r.id as 'roomId', r.name as 'roomName', r.unique_name as 'roomUniqueName', r.lastNumber as 'roomLastNumber' FROM Companies c , Rooms r WHERE r.CompanyId = c.id and r.id = ?`,
	ROOMS_GET_CURRENT_BY_ROOM_UNIQUE_NAME: `SELECT * FROM Rooms WHERE unique_name = ?`,
	ROOMS_UPDATE_CURRENT_BY_ROOM_UNIQUE_NAME: `UPDATE Rooms SET currentNumber = ? WHERE unique_name = ?`,
});
