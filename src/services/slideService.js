import db from "../models/index";

let handleGetAllSlide = async() => {
  return new Promise(async (resolve, reject) => {
    try {
      let slides = await db.Slide.findAll();
      resolve({
        errCode:0,
        errMessage: "Get all slide successfully!",
        data: slides
      });
    } catch (err) {
      reject(err);
    }
  })
}

let handleCreateSlide = (data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      console.log("check data:", data);
      if(!data){
        resolve({
          errCode: 1,
          errMessage: "Missing input parametes"
        });
      }
      // console.log(data);
      await db.Slide.create({
        idP: data.idP,
        nameS: data.nameS,
        imageS: data.imageS,
        content: data.content,
        timeUpdate: data.timeUpdate
      })
      resolve({
        errCode: 0,
        message: "Create new slide successfully!"
      });
    } catch (e) {
      reject(e)
    }
  })
}

let handleUpdateSlide = async(data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!data || !data.id){
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let slide = await db.Slide.findOne({
        where: {id: data.id},
        raw: false

      })
      if(!slide){
        resolve({
          errCode: 2,
          errMessage: "Slide not found!"
        })
      }
      slide.idP = data.idP?data.idP:slide.idP;
      slide.nameS = data.nameS?data.nameS:slide.nameS;
      slide.imageS = data.imageS?data.imageS:slide.imageS;
      slide.content = data.content?data.content:slide.content;
      slide.timeUpdate = data.timeUpdate?data.timeUpdate:slide.timeUpdate;
      slide.save();
      resolve({
        errCode: 0,
        message: "Update slide successfully!"
      })
    }catch(e){
      reject(e)
    }
  })
}

let handleDeleteSlide = async(idS)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idS){
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let slide = await db.Slide.findOne({
        where: {id: idS},
        raw: false
      })
      if(!slide){
        resolve({
          errCode: 2,
          errMessage: "Slide not found!"
        })
      }
      await slide.destroy();
      resolve({
        errCode:0,
        message: "Delete slide successfully!"
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleGetAllSlide,
  handleCreateSlide,
  handleUpdateSlide,
  handleDeleteSlide
}