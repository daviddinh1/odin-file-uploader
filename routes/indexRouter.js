const { Router } = require("express");
const indexController = require("../controllers/indexController");
const multer = require("multer");
const upload = multer({
  dest: "/Users/daviddinh/repos/odin-file-uploader/files",
});

const indexRouter = Router();

indexRouter.get("/", indexController.renderHome);
indexRouter.get("/signup", indexController.getSignUp);
indexRouter.post("/signup", indexController.addUserData);

indexRouter.get("/fileupload/:folderId", indexController.renderFileUpload);
indexRouter.post(
  "/fileupload/:folderId",
  upload.single("uploaded_file"),
  indexController.addFileToFolder
);

indexRouter.get("/createfolder", indexController.renderCreateFolder);
indexRouter.post("/createfolder", indexController.createFolder);
//figure out how to go to another route for the folder and allow users to upload files to that route
indexRouter.get("/userfolder", indexController.renderUserFolders);
indexRouter.post("/userfolder/delete", indexController.deleteFolder);

indexRouter.get("/userfolder/:foldername", indexController.renderIndivFolder);
indexRouter.get(
  "/userfolder/:foldername/download",
  indexController.downloadFile
);

module.exports = indexRouter;
