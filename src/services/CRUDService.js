import db from "../models/index";
import bcrypt from 'bcryptjs';
let salt = bcrypt.genSaltSync(10);

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

module.exports = {
  handleCreateAcc,
}