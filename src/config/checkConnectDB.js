const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('data_ttcs', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

let checkConnectDB = async ()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = checkConnectDB;