const { render } = require("ejs");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function getSignUp(req, res) {
  res.render("signup");
}

async function addUserData(req, res, next) {
  const { username, password } = req.body;
  try {
    const hashpass = await bcrypt.hash(password, 10);
    await db.addUserData(username, hashpass);
    res.send("check database for user info");
  } catch (error) {
    next(error);
  }
}

async function renderHome(req, res) {
  console.log(req.user);
  res.render("home", { user: req.user });
}

async function renderFileUpload(req, res) {
  res.render("fileupload", { user: req.user });
}

async function renderCreateFolder(req, res) {
  res.render("createfolder", { user: req.user });
}

async function createFolder(req, res, next) {
  const name = req.body.folderName;
  console.log(req.user.id);
  try {
    await db.addFolder(req.user.id, name);
    res.send("check database if folder is create");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getSignUp,
  addUserData,
  renderHome,
  renderFileUpload,
  renderCreateFolder,
  createFolder,
};
