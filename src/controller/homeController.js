import db from "../models/index";

let getHomePage = async(req, res)=>{
  let data = await db.User.findAll();
  console.log("---------------")
  // console.log("check data", data);
  console.log("---------------")
  res.render("about.ejs", {
    data: JSON.stringify(data)
  })
}

let loginPage = (req, res)=>{
  res.render("login.ejs");
}

let adminPage = (req, res)=>{
  return res.render("admin/home.ejs");
}

module.exports = {
  getHomePage,
  loginPage,
  adminPage,
}