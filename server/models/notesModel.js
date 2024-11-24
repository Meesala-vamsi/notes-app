const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,"Title field is required."]
  },
  description:{
    type:String,
    required:[true,"Description is required field."]
  },
  category:{
    type:String,
    enum:["Work","Personal","Others"],
    default:"Work"
  }
},{timestamps:true});

const Notes = mongoose.model("Notes",notesSchema);

module.exports = Notes;