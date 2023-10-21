const mysql = require("mysql2/promise");

module.exports = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "crud2023",
  password: "crud2023!",
  database: "nodeCRUD",
});
