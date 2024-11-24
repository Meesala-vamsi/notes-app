const Notes = require("../models/notesModel");
const { asyncHandler } = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");

//POST NOTES
exports.createNotes = asyncHandler(async (req,res,next)=>{
  const notes = await Notes.create(req.body);

  res.status(201).json({
    status:"success",
    message:"Notes created successfully..."
  })
})

//GET ALL NOTES
exports.fetchAllNotes = asyncHandler(async(req,res,next)=>{
  const { category, search } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const notes = await Notes.find(filter).sort({createdAt:-1});
  
  if(notes.length<=0){
    const error = new CustomError("No data found..",200);
    return next(error);
  }

  res.status(200).json({
    status:"success",
    data:{
      notes
    }
  })
})

//UPDATE NOTES
exports.updateNotes = asyncHandler(async(req,res,next)=>{
  
  const notes = await Notes.findById(req.params.id);

  if(!notes){
    const error = new CustomError("Notes not found",404);
    return next(error);
  }

   await Notes.findByIdAndUpdate(req.params.id,req.body,{new:true});

  res.status(200).json({
    status:"success",
    message:"Notes updated successfully..."
  })
})

//DELETE NOTES
exports.deleteNotes=asyncHandler(async(req,res,next)=>{
  const notes = await Notes.findById(req.params.id);

  if (!notes) {
    const error = new CustomError("Notes not found", 404);
    return next(error);
  }
  await Notes.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Notes deleted successfully...",
  });
});