import db from "../models/index";
import bcrypt from 'bcryptjs';
let salt = bcrypt.genSaltSync(10);

let handleLogin = (data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      
    }catch{

    }
  });
}

let handleCreateAcc = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.passwordAcc);
      await db.Account.create({
        idAuth: parseInt(data.idAuth),
        nameAcc: data.nameAcc,
        emailAcc: data.emailAcc,
        passwordAcc: hashPasswordFromBcrypt
      })
      resolve("ok! create new user susses")
    } catch (e) {
      reject(e)
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword)
    } catch (e) {
      reject(e)
    }
  })
}

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!email || !password) {
        resolve({
          errCode: 4,
          errMessage: "Missing input parameters!"
        })
      }
      let isExist = await checkEmail(email);
      // neu ton tai email thi check password
      if(!isExist){
        resolve({
          errCode: 1,
          errMessage: "Your email not exit. Please try again!"
        })
      }
      let acc = await db.Account.findOne({
        where: { emailAcc: email },
        attributes: ['emailAcc', 'passwordAcc', 'idAuth'],
        raw: true
      })
      if(!acc){
        resolve({
          errCode: 1,
          errMessage: "Account not exist in db!"
        })
      }
      let check = await bcrypt.compare(password, acc.passwordAcc);
      if(!check){
        resolve({
          errCode: 2,
          errMessage: "Wrong password!"
        })
      }
      let response = {};
      response.errCode = 0;
      response.message = "Login successfully!";
      switch(acc.idAuth) {
        case 1:
          response.idAuth = 1;
          break;
        case 2:
          response.idAuth = 2;
          break;
        case 3:
          response.idAuth = 3;
          break;
        default:
          response.idAuth = -1;
          response.errMessage = "Authority not exist!"
      }
      resolve(response);
    } catch (e) {
      reject(e)
    }
  })
}
let checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try{
      let user = await db.Account.findOne({
        where: { emailAcc: userEmail }
      })
      if(user) {
        resolve(true)
      }
      else {
        resolve(false)
      }
    }catch(e) {
      reject(e)
    }
  })
}

module.exports = {
  handleCreateAcc,
  handleUserLogin, 
}