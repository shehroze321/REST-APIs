const mongoose= require("mongoose");
//  here we define schema 
const Todo=new mongoose.Schema(
    {
        task:{
            type:String,
            required:true,
            trim:true,
            maxlength:30,
        },
    },
    {timestamps:true}
)
module.exports=mongoose.model("Todo",Todo);
//  no need to export schema it include in model 