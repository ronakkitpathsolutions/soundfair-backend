const path = require("path");
let dir = __dirname.split("\src")[0]
require("dotenv").config({ path: path.join(dir, "/.env") })

exports.development = {
  username: "root",
  password: "ips12345",
  database: "db_soundfair",
  host: "localhost",
  dialect: "mysql",
  secretKey: process.env.JWT_SECRET,
}
