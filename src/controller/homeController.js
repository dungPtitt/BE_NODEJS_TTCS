import db from "../models/index";
import homeService from "../services/homeService";

let getHomePage = async(req, res)=>{
  let data = await db.User.findAll();
  console.log("---------------")
  // console.log("check data", data);
  console.log("---------------")
  res.render("about.ejs", {
    data: JSON.stringify(data)
  })
}

let loginPage = async (req, res)=>{
  try{
    let data = req.body;
    let response = await homeService.handleUserLogin(data.email, data.password);
    console.log("data: ", response);
    if(response.errCode==0){
      switch (response.idAuth) {
        case 1:
          res.redirect("/admin");
          break;
        case 2:
          res.render("manager/home.ejs");
          break;
        case 3:
          res.render("member/home.ejs");
          break;
        default:
          res.render("login.ejs");
          
          break;
      }
    }else{
      res.render("login.ejs", {data: JSON.stringify(response.errMessage)});
    }
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let adminPage = (req, res)=>{
  return res.render("admin/home.ejs");
}

module.exports = {
  getHomePage,
  loginPage,
  adminPage,
}