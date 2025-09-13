
 const User = require("../models/User")
 const mailSender = require("../utils/mailSender");
 const bcrypt = require("bcrypt")
 const crypto = require("crypto")

 // reset password token 
 exports.resetPasswordToken = async (req,res) => {
  try{ // get email form req body
    const email = req.body.email;

    // check user for this email , email validation
    const user = await User.findOne({email:email})
    
    if (!user){
        return res.status(404).json({
            success:false,
            message:"Email not found for password reset"
        })
    }

    // genrate the token
    const token =  crypto.randomUUID(); // we get the random id 

    const updatedDetails = await User.findOneAndUpdate(
        {email:email},
        {
            token:token,
            resetPasswordExpires:Date.now()+5*60*1000
        },
        {new:true});

    //create url
    const url = `http://localhost:3000/update-password/${token}`

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    )
  return   res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
      url:url
		});
} 
catch(err){
    console.log(err)
    return res.status(404).json({
            success:false,
            message:"Something went Wrong while reset password"
        })
}

 }

 // reset password
 exports.resetPassword = async(req,res)=> {
    try {
     const {password,confirmPassword,token} = req.body;
 
     // password and confirmPassoword
     if (confirmPassword !== password){
         return  res.status(404).json({
            success:false,
            message:"While reset, password does not match"
          })
     }

     // get the user details from db using token
     const userDetails = await User.findOne({token:token});

     // if no entry invalid token
     if(!userDetails){
         res.status(404).json({
            success:false,
            message:"Entry not found while reset password"
          })
     }
     // check if token is expire or not if exprire give response
     if(userDetails.resetPasswordExpires < Date.now()){
       return res.status(404).json({
            success:false,
            message:"Token is expired please regenrate the password"
          })
     }

     // hash the password 
     const hasedPassord = await bcrypt.hash(password,10)

    //  // password update
    //  await User.findOneAndUpdate(
    //     {token:token},
    //     {password:hasedPassord},
    //     {new:true},
    //  );

      // ✅ Update password and clear token
    userDetails.password = hasedPassord;
    userDetails.token = undefined;
    userDetails.resetPasswordExpires = undefined;
    await userDetails.save();

     // return response
      return res.status(200).json({
            success:true,
            message:"Passowrd Reset successfull"
          })

    }
    catch(err){
        console.log(err)
          return res.status(401).json({
            success:false,
            message:"Error in Password Reset"
          })
    }


 }  