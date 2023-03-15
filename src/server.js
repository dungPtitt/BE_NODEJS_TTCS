import configViewEngine from "./config/viewEngines";
import checkConnectDB from "./config/checkConnectDB";
import express from "express";
import initWebRoute from './router/web';
import initApiRoute from "./router/api";
// import initAPIRoute from './router/api';
require('dotenv').config()
const app = express()

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
//set ejs engine
configViewEngine(app)
//init web route
initWebRoute(app)
//init api route
initApiRoute(app)

checkConnectDB();


const port = process.env.PORT || 8080

// app.get('/', (req, res) => {
//   res.render("index.ejs")
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})