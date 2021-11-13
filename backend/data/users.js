const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("ank123456", 10),
    isAdmin: true,
  },
  {
    name: "Ankan",
    email: "ankan@gmail.com",
    password: bcrypt.hashSync("ank123456", 10),
  },
  {
    name: "Jane Doe",
    email: "Jane@gmail.com",
    password: bcrypt.hashSync("ank123456", 10),
  },
];

module.exports = users;
