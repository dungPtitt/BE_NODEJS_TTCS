import express from "express";
import homeController from '../controller/homeController';
import accountController from '../controller/accountController';
let router = express.Router()

const initWebRoute = (app)=> {
  router.get("/", homeController.getHomePage);
  router.get("/crud-acc", accountController.getViewCRUDAcc);
  router.post("/create-acc", accountController.createAcc);
  return app.use("/", router);
}

export default initWebRoute;