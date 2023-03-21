import express from "express";
import accountController from '../controller/accountController';
import productController from "../controller/productController";
import slideController from "../controller/slideController";
let router = express.Router();

const initApiRoute = (app)=> {
  router.get("/api/get-all-acc", accountController.getAllAcc);
  router.post("/api/create-acc", accountController.createAcc);
  router.put("/api/update-acc", accountController.updateAcc);
  // api delete dang bi loi chua fix
  router.delete("/api/delete-acc", accountController.deleteAcc);

  router.get("/api/get-all-product", productController.getAllProduct);
  router.get("/api/get-group-product", productController.getGroupProduct);
  router.get("/api/get-product", productController.getProduct);
  router.post("/api/create-product", productController.createProduct);
  router.put("/api/update-product", productController.updateProduct);
  router.delete("/api/delete-product", productController.deleteProduct);

  router.get("/api/get-all-slide", slideController.getAllSlide);
  router.post("/api/create-slide", slideController.createSlide);
  router.put("/api/update-slide", slideController.updateSilde);
  router.post("/api/delete-slide", slideController.deleteSlide);
  return app.use("/", router);
}

export default initApiRoute;