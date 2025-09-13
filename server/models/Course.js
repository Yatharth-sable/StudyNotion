const mongoose = require("mongoose")
const courseSchema = new mongoose.Schema({
     courseName:{
        type:String,
        trim:true,
        required:true,
     },
	courseDescription: { type: String },

     instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     whatYouWillLearn:{
        type:String,
     },
     courseContent:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
        }
     ],
      ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
     }],
      price:{
        type:Number,
        trim:true,
     },
     thumbnail:{
        type:String,
     },
     // studentEnrolled to studentsEnrolled
     studentsEnrolled:[
   {
      type: mongoose.Schema.Types.ObjectId,
      required:true, 
      ref: "User"
   }
],
     tags:{
      type:[String],

     },
     category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category" // maybe t aayega
     },
     instructions:{
        type:[String]
     },
     status: { type:String, enum:["Draft",'Published'], default:"Draft" },
     createdAt: {
		type:Date,
		default:Date.now
	},

     
})
module.exports = mongoose.model("Course",courseSchema)