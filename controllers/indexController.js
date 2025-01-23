const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function getSignUp(req, res) {
  res.render("signup");
}

async function addUserData(req, res) {
  const { username, password } = req.body;
  try {
    const hashpass = await bcrypt.hash(password, 10);
    await db.addUserData(username, hashpass);
    res.send("check database for user info");
  } catch (error) {
    next(err);
  }
}

module.exports = { getSignUp, addUserData };
