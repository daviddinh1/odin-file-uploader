const { render } = require("ejs");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const path = require("path");

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
  res.render("fileupload", { user: req.user, folderId: req.params.folderId });
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

async function renderUserFolders(req, res, next) {
  try {
    const folderObj = await db.getAllFolders(req.user.id);
    res.render("userfolder", { user: req.user, folderObj: folderObj });
  } catch (err) {
    next(err);
  }
}

async function renderIndivFolder(req, res, next) {
  try {
    const folderName = req.params.foldername;
    const files = await db.getFolderFiles(folderName);
    res.render("indivfolder", { folderName: folderName, files: files });
  } catch (error) {
    next(error);
  }
}

async function deleteFolder(req, res, next) {
  try {
    let { folderId } = req.body;
    folderId = parseInt(folderId);

    await db.deleteFolder(folderId);
    res.redirect("userfolder");
  } catch (error) {
    next(error);
  }
}

async function addFileToFolder(req, res, next) {
  try {
    const filename = req.file.filename;
    const size = req.file.size;
    const folderId = parseInt(req.params.folderId);
    await db.addFile(filename, size, folderId);
    res.redirect("userfolder");
  } catch (error) {
    next(error);
  }
}

async function downloadFile(req, res, next) {
  try {
    const { fileName } = req.query;
    console.log("the filename is:", fileName);
    const filePath = path.join("files", fileName);
    console.log("checking if correct path is outputted:", filePath);
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error serving file");
      }
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getSignUp,
  addUserData,
  renderHome,
  renderFileUpload,
  renderCreateFolder,
  createFolder,
  renderUserFolders,
  renderIndivFolder,
  deleteFolder,
  addFileToFolder,
  downloadFile,
};
