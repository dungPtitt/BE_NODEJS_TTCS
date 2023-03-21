import db from "../models/index";

let handleCreateProduct = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data){
        resolve({
          errCode: 1,
          errMessage: "Missing input parametes"
        });
      }
      console.log(data);
      await db.Product.create({
        idGroup: data.idGroup,
        nameP: data.nameP,
        priceP: data.priceP,
        countP: data.countP,
        imageP: data.imageP,
        infoP: data.infoP,
        parameterP: data.parameterP
      })
      resolve({
        errCode: 0,
        message: "Create new user successfully!"
      });
    } catch (e) {
      reject(e)
    }
  })
}

let handleGetProduct = async (idProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!idProduct){
        return res.status(200).json({
          errCode: 1,
          errMessage: "Missing input paramete id product"
        })
      }
      let product = await db.Product.findOne({
        where: {id: idProduct}
      })
      resolve({
        errCode: 0,
        errMessage: "Get product successfully!",
        data: product
      });
    } catch (err) {
      reject(err);
    }
  })
}

let handleGetGroupProduct = async(idGroup) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!idGroup){
        return res.status(200).json({
          errCode: 1,
          errMessage: "Missing paramete id groupt product"
        })
      }
      let products = await db.Product.findOne({
        where: {idGroup: idGroup}
      })
      resolve({
        errCode: 0,
        message: "Get group product successfully!",
        data: products
      });
    } catch (err) {
      reject(err);
    }
  })
}

let handleGetAllProduct = async() => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll();
      resolve({
        errCode:0,
        errMessage: "Get all product successfully!",
        data: products
      });
    } catch (err) {
      reject(err);
    }
  })
}


let handleUpdateProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parametor id!"
        })
      }
      let product = await db.Product.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!product) {
        resolve({
          errCode: 2,
          errMessage: "Product not found!"
        })
      }
      product.idGroup = data.idGroup? data.idGroup : product.idGroup;
      product.nameP = data.nameP? data.nameP : product.nameP;
      product.priceP = data.priceP? data.priceP: product.priceP;
      product.countP = data.countP? data.countP: product.countP;
      product.imageP = data.imageP? data.imageP: product.imageP;
      product.infoP = data.infoP? data.infoP: product.infoP;
      product.parameterP = data.parameterP? data.parameterP: product.parameterP;
      product.save();
      resolve({
        errCode: 0,
        message: "Update Acc Success!"
      })
    } catch (e) {
      reject(e);
    }
  })
}

let handleDeleteProduct = (idProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!idProduct){
        resolve({
          errCode: 1,
          errMessage: "Missing input id",
        })
      }
      let product = await db.Product.findOne({
        where: { id: idProduct },
        raw: false
      })
      if (!product) {
        resolve({
          errCode: 2,
          errMessage: "Product isn't exit",
        })
      }
      console.log(product)
      await product.destroy();
      // await db.User.destroy({
      //   where: { id: userId }
      // })
      resolve("Delete product success!")
    } catch (e) {
      reject(e)
    }
  })
}
module.exports = {
  handleCreateProduct,
  handleGetProduct,
  handleGetGroupProduct,
  handleGetAllProduct,
  handleUpdateProduct,
  handleDeleteProduct,
}