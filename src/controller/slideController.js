import db from "../models";
import slideService from "../services/slideService";

let getAllSlide = async (req, res) => {
  try{
    let response = await slideService.handleGetAllSlide();
    return res.status(200).json(response);
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!",
    })
  }
  
}

let createSlide = async(req, res)=>{
  try{
    let data = req.body;
    if(!data){
      res.status(200).json({
        errCode: 1,
        errMessage: "Missing input parameter!"
      });
    }
    let response = await slideService.handleCreateSlide(data);
    res.status(200).json(response);
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let updateSilde = async(req, res)=>{
  try{
    let data = req.body;
    if(!data){
      res.status(200).json({
        errCode: -1,
        errMessage: "Missing input parameter!"
      })
    }
    let response = await slideService.handleUpdateSlide(data);
    res.status(200).json(response);
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let deleteSlide = async(req, res)=>{
  try{
    let data = req.body;
    if(!data){
      res.status(200).json({
        errCode: 1,
        errMessage: "Missing input parameter!"
      })
    }
    let response = await slideService.handleDeleteSlide(data.id);
    res.status(200).json(response);
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}
module.exports = {
  getAllSlide,
  createSlide,
  updateSilde,
  deleteSlide
}