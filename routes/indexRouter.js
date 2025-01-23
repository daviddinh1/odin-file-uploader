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

indexRouter.get("/fileupload", indexController.renderFileUpload);
indexRouter.post("/fileupload", upload.single("uploaded_file"), (req, res) => {
  //for the function add it in controllers when done
  console.log(req.file, req.body);
  res.send("check file ecosystem");
});

indexRouter.get("/createfolder", indexController.renderCreateFolder);
indexRouter.post("/createfolder", indexController.createFolder);

module.exports = indexRouter;
