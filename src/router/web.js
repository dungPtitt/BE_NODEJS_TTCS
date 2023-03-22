import express from "express";
import homeController from '../controller/homeController';
import accountController from '../controller/accountController';
let router = express.Router()

const initWebRoute = (app)=> {
  router.get("/", homeController.loginPage);
  router.post("/login", accountController.authorityLogin);
  router.get("/admin", homeController.adminPage);
  router.get("/crud-acc", accountController.getViewCRUDAcc);
  router.post("/create-acc", accountController.createAcc);
  return app.use("/", router);
}

export default initWebRoute;