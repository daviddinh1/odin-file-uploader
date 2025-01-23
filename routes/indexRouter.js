const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/signup", indexController.getSignUp);
indexRouter.post("/signup", indexController.addUserData);

module.exports = indexRouter;
