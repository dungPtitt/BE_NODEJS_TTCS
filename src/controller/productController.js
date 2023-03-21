import productService from "../services/productService";


let getProduct = async (req, res) => {
  try{
    let idProduct = req.query.id;
    if(!idProduct){
      res.status(200).json({
        errCode: 1,
        errMessage: "Missing input parameter!"
      })
    }
    let response = await productService.handleGetProduct(idProduct);
    return res.status(200).json(response);
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!",
    })
  }
  
}

let getGroupProduct = async (req, res) => {
  try{
    let idGroup = req.body.idGroup;
    let response = await productService.handleGetGroupProduct(idGroup);
    return res.status(200).json(response);
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let getAllProduct = async (req, res) => {
  try {
    let response = await productService.handleGetAllProduct();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let createProduct = async(req, res)=>{
  try {
    let data = req.body;
    console.log(data);
    let response = await productService.handleCreateProduct(data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateProduct = async (req, res) => {
  try{
    let data = req.body;
    if(!data){
      res.status(200).json({
        errCode: 1,
        errMessage: "Missing input parametes"
      })
    }
    let response = await productService.handleUpdateProduct(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let deleteProduct = async (req, res) => {
  try {
    let idProduct = req.body.id;
    if (!idProduct) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Misssing input parametor id!"
      })
    }
    let response = await productService.handledeleteProduct(idProduct);
    return res.status(200).json(response);
  }catch(e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
module.exports = {
  createProduct,
  getProduct,
  getGroupProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
}