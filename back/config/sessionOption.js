var options = {
  host: "localhost",
  port: "3306",
  user: "crud2023",
  password: "crud2023!",
  database: "nodeCRUD",

  clearExpired: true,
  checkExpirationInterval: 10000,
  expiration: 1000 * 60 * 60 * 24,
};

module.exports = options;
