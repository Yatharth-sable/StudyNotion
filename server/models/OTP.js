const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")
const emailTemplate = require("../mail/templates/emailVerificationTemplate");


const OTPSchema = mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  otp:{
    type:String,
    required:true
  },  
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60
  },
})

// async function to send the email
async function sendVerificationEmail(email,otp) {
   try{
      const mailResponse = await mailSender(email,"Verification email is send",emailTemplate(otp))
      console.log("Mail sent successfully",mailResponse)
      
   }
   catch(err){
       console.log("Error while sending the email")
       throw err;
   }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
  next();
});


const OTP = mongoose.model("OTP",OTPSchema)
module.exports = OTP;
