const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail,} = require("../mail/templates/courseEnrollmentEmail");
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail");  
const CourseProgress = require("../models/CourseProgress");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  let totalAmount = 0;
  if (courses.length === 0) {
    return res.json({ success: false, message: "Course provide course id " });
  }

  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "could not find the course " });
      }
      totalAmount += course.price;
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  }
  
  const crypto = require("crypto");


  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: "rcpt_" + Date.now()
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.json({
      success: true,
      message: paymentResponse,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Could not instiate order" });
  }
};

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_payment_id ||
    !razorpay_order_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({
      success: false,
      message: "Payment Failed",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // enroll karaoo course me
    await enrolledStudents(courses, userId, res);

    // return res
    return res.status(200).json({ success: true, message: "Payment Verified" });
  }
  return res.status(200).json({
    success: false,
    message: "payment failed",
  });
};

const enrolledStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(200).json({
      success: false,
      message: "Please provide data for courses or userId",
    });
  }
  for (const courseId of courses) {
    try{
       // find the course and enroll the students in it
    const enrolledCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $addToSet: { studentsEnrolled: userId } },
      { new: true }
    );
     if (!enrolledCourse) {
        failedCourses.push(courseId);
        continue; 
      }

      const courseProgress = await CourseProgress.create({
        courseID:courseId,
        userId:userId,
        completedVideos:[],
      })

    // find the students and add the course to their list of enrolled course
    const enrolledStudent = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          courses: courseId,
          courseProgress: courseProgress._id,
        },
      },
      { new: true }
    );
    // bacho ko mail send kr do 
    const emailResponse = await mailSender(
      enrolledStudent.email,
      `Successfully Enrolled into  ${enrolledCourse.courseName}`,
      courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName}`)
    )
    console.log("Email Sent Sucessfully",emailResponse.response)
    }
    catch(err){
     console.log(err)
     return res.status(500).json({success:false, message : err.message})
  }
  } 
};

 exports.sendPaymentSuccessEmail = async(req,res) => {
         const {orderId,paymentId,amount} = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({success:false,message:"Please provide all the fields"});
    }

    try{
      // student ko search kro
      const enrolledStudent = await User.findById(userId);
      await mailSender(
        enrolledStudent.email,
        `Payment Recieved`,
        paymentSuccessEmail(`${enrolledStudent.firstName}`),
        amount/100,orderId,paymentId)
    }catch(err){
       console.log("error in sending mail",err)
     return res.status(500).json({success:false, message : err.message})
    }
 }

// // capture the payment and intiate the razorpay order
// that is only for single  course
// exports.capturePayment = async(req,res)=>{
//     // get courseId and userId
//     const {course_id} = req.body
//     const userId = req.user.id
//     // validation
//     // valid courseid
//       if (course_id){
//         return res.status(400).json({
//             success:false,
//             message:"payments:errors to fetch the courseId"
//         })
//     }
//         // valid courseDetail
//         let course;
//         try{
//          course = await Course.findById(course_id)
//          if(!course){
//             return res.status(400).json({
//                success:false,
//                message:"payments:could not find the course"
//             })
//          }

//          // check user already pay for the same course
//          // converts id into objectid which was in string . convert bz course me objectid ke isse store kiya h
//          const uid= new mongoose.Types.ObjectId(userId);
//          if(course.studentEnrolled.includes(uid)){
//              return res.status(200).json({
//                 success:false,
//                 message:"Student is already Enrolled"
//              })
//          }
//          }
//         catch(err){
//            console.log(err)
//            return res.status(500).json({
//              success:false,
//              message:err.message
//            })
//         }

//          // Order create
//          const amount = course.price
//          const currency = "INR";

//          const options = {
//             amount : amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId : course_id,
//                 userId,
//             }
//          }

//          try{
//            // initiate the payment using razopay
//            const paymentResponse = await instance.orders.create(options)
//            console.log(paymentResponse)

//             return res.status(200).json({
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId:course.paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount,
//              })
//          }
//           catch(err){
//            console.log(err)
//            return res.status(500).json({
//              success:false,
//              message:"could not intiate the order"
//            })
//           }
// }

// // verify the signature of razorpay and server

// exports.verifySignature = async(req,res) =>{

//    const webhookSecret = "1234567"
//    // razorpay se yeh format me secret key aayegi
//    const signature = req.headers("x-razorpay-signature")

//    // to convert the webhooksecret  to encryption we use this , sha256 is hashing algo
//    const shasum = crypto.createHmac("sha256",webhookSecret);

//    // convert it to the string
//    shasum.update(JSON.stringify(req.body))
//    // digest me likhte hai bs
//    const digest = shasum.digest("hex")

//   if (signature === digest){
//       console.log("Payment is Authorized")

//      // now we have to enroll the student into the course
//      const {courseId,userId} = req.body.payload.payment.entity.notes

//      try{
//        // fullfill the action

//        // find the course and enroll the student
//        const enrolledCourse = await Course.findOneAndUpdate(
//                                               {_id:courseId},
//                                               {$push:{studentEnrolled:userId}},
//                                               {new:true}
//        )

//        if(!enrolledCourse){
//          return res.status(500).json({
//             success:false,
//             message:"Course Not found"
//          })
//        }
//        console.log(enrolledCourse)
//        // find the student and student ke andr course me course_id ko add krdo
//         const enrolledStudent = await User.findOneAndUpdate(
//                                               {_id:userId},
//                                               {$push:{course:courseId}},
//                                               {new:true}
//        )
//        console.log(enrolledStudent)

//        // send confimation mail to student to that your course successfully buy
//          const emailResponse = await mailSender(
//                                enrolledStudent.email,
//                                "Email form StudyNotion",
//                                "congrats,you are onboared to the course "
//          )
//        console.log(emailResponse)
//        return res.status(200).json({
//         success:true,
//         message:"Signature Verified and course valided"
//        })

//      }
//      catch(err){
//             console.log(err)
//            return res.status(500).json({
//              success:false,
//              message:err.message
//            })
//      }
//   }

//   else{
//       return res.status(400).json({
//         success:false,
//         message:"Failed to do enrolled to course"
//       })
//   }
// }
