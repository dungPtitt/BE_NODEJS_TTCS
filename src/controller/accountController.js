import accountService from "../services/accountService";

let getViewCRUDAcc = (req, res)=>{
  return res.render("account/crud.ejs");
}

//
let login = async (req, res) => {
  try{
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
      return res.status(200).json({
        errCode: 1,
        message: 'Missing input params'
      })
    }
    let dataUser = await accountService.handleUserLogin(email, password)
    return res.status(200).json({
      errCode: dataUser.errCode,
      message: dataUser.errMessage,
      user: dataUser.userInfo ? dataUser.userInfo : {}
      // user: dataUser.userInfo
    })
  }catch(e){
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
  
}

let getAcc = async (req, res) => {
  try{
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing input parametes"
      })
    }
    //id = "All" => tat ca user
    //id = ...
    let account = await accountService.handleGetAcc(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      account
    })
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let getAllAcc = async (req, res) => {
  try {
    let id = req.query.id;
    if(!id){
      res.status(200).json({
        errCode: 1,
        errMessage: "Missing input prarametes"
      })
    }else{
      let accounts = await accountService.handleGetAcc(id);
      return res.status(200).json(accounts);
    }
    
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
let createAcc = async(req, res)=>{
  try {
    let data = req.body;
    if(!data){
      res.status(200).json({
        errCode: 1,
        errMessage: "Missing input parametes"
      });
    }
    let message = await accountService.handleCreateAcc(data);
    return res.status(200).json(message);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateAcc = async (req, res) => {
  try{
    let data = req.body;
    if(!data){
      res.status(200).json({
        errCode: 1,
        errMessage: "Missing input parametes"
      })
    }
    let message = await accountService.handleUpdateAcc(data);
    return res.status(200).json({
      errCode: 0,
      message: message
    });
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let deleteAcc = async (req, res) => {
  try {
    let useId = req.body.id;
    if (!useId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Misssing input parametor id!"
      })
    }
    let message = await accountService.handledeleteAcc(+useId);
    return res.status(200).json({
      errCode: 0,
      message: message
    })
  }catch(e) {
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
module.exports = {
  getViewCRUDAcc,
  //
  login,
  createAcc,
  getAcc,
  getAllAcc,
  updateAcc,
  deleteAcc
}