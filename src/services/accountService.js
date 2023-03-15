import db from "../models/index";
import bcrypt from 'bcryptjs';
let salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkEmail(email);
      // neu ton tai email thi check password
      let dataUser = {}
      if(!isExist){
        dataUser.errCode = 1,
        dataUser.errMessage = 'Your email not exit. Please try other!'
      }else{
      //check password
      // check user co ton tai tiep de tranh loi
        let user = await db.Account.findOne({
          attributes: ['emailAcc', 'passwordAcc', 'idAuth'],
          where: { emailAcc: email },
          raw: true
        })
        if (user) {
          let check = await bcrypt.compare(password, user.passwordAcc);
          if (check) {
            dataUser.errCode = 0;
            dataUser.errMessage = 'OK';
            delete user['passwordAcc'];
            dataUser.userInfo = user;
          } else {
            dataUser.errCode = 3,
              dataUser.errMessage = 'Wrong password'
          }
        }
        else {
          dataUser.errCode = 2,
          dataUser.errMessage = 'User not found!'
        }
      }
      resolve(dataUser)
    } catch (e) {
      reject(e)
    }
  })
}

let checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Account.findOne({
        where: { emailAcc: userEmail }
      })
      if (user) {
        resolve(true)
      }
      else {
        resolve(false)
      }
    } catch (e) {
      reject(e)
    }
  })
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




let handleGetAcc = (id) => {
  return new Promise(async (resolve, reject) => {
  let users = '';
    try {
      if (id == 'All') {
        users = await db.Account.findAll();
      }
      if (id && id !== 'All') {
        let idAcc = parseInt(id);
        users = await db.Account.findOne({
          where: { id: idAcc },
        })
      }
      resolve(users)
    } catch (err) {
      reject(err)
    }
  })
}

let handleUpdateAcc = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parametor id!"
        })
      }
      let acc = await db.Account.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!acc) {
        resolve({
          errCode: 2,
          errMessage: "Account not found!"
        })
      }
      acc.idAuth = data.idAuth? data.idAuth : acc.idAuth;
      acc.nameAcc = data.nameAcc? data.nameAcc : acc.nameAcc;
      acc.emailAcc = data.emailAcc? data.emailAcc: acc.emailAcc;
      //co the cho cap nhat mat khau lun hoac chia thanh th khac
      acc.password = data.passwordAcc? data.passwordAcc: acc.passwordAcc;
      acc.save();
      resolve({
        errCode: 0,
        message: "Update Acc Success!"
      })
    } catch (e) {
      reject(e)
    }
  })
}

let handleDeleteAcc = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!userId){
        resolve({
          errCode: 1,
          errMessage: "Missing input id",
        })
      }
      console.log(userId);
      let acc = await db.Account.findOne({
        where: { id: userId },
        raw: false
      })
      if (!acc) {
        resolve({
          errCode: 2,
          errMessage: "Account isn't exit",
        })
      }
      console.log(acc)
      await acc.destroy();
      // await db.User.destroy({
      //   where: { id: userId }
      // })
      resolve("Delete account success!")
    } catch (e) {
      reject(e)
    }
  })
}
module.exports = {
  handleUserLogin,
  handleGetAcc,
  handleCreateAcc,
  handleUpdateAcc,
  handleDeleteAcc,
}