import CRUDservice from "../services/CRUDService";

let getViewCRUDAcc = (req, res)=>{
  return res.render("account/crud.ejs");
}

let createAcc = async(req, res)=>{
  try {
    let message = await CRUDservice.handleCreateAcc(req.body);
    return res.status(200).json(message);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

module.exports = {
  getViewCRUDAcc,
  createAcc,
}