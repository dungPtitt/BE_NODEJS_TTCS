import express from "express";
import accountController from '../controller/accountController';
let router = express.Router();

const initApiRoute = (app)=> {
  router.get("/api/get-all-acc", accountController.getAllAcc);
  router.post("/api/create-acc", accountController.createAcc);
  router.put("/api/update-acc", accountController.updateAcc);
  router.delete("/api/delete-acc", accountController.deleteAcc);
  return app.use("/", router);
}

export default initApiRoute;