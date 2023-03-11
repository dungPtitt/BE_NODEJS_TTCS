import db from "../models/index";

let getHomePage = async(req, res)=>{
  let data = await db.User.findAll();
  console.log("---------------")
  console.log("check data", data);
  console.log("---------------")
  res.render("about.ejs", {
    data: JSON.stringify(data)
  })
}

module.exports = {
  getHomePage
}