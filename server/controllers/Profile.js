const Profile = require("../models/Profile")
const User = require("../models/User")
const {auth} = require("../middlewares/auth");
const {uploadImageToCloudinary}  = require("../utils/imageUploader")
const Course = require("../models/Course")


exports.updateProfile = async (req, res) => {
  try {
    // get the data from request
    const { dateOfBirth = "", about = "", contactNumber, gender, firstName, lastName } = req.body;

    // get user Id
    const id = req.user.id;

    // validation
    if (!contactNumber || !dateOfBirth || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required for Profile",
      });
    }

    // find user
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Update User basic info
    userDetails.firstName = firstName;
    userDetails.lastName = lastName;
    await userDetails.save();

    // find and update Profile
    const profile = await Profile.findById(userDetails.additionalDetails);
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.gender = gender;
    profile.contactNumber = contactNumber;
    await profile.save();

    // get updated user with populated profile
    const updatedUser = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser, // ✅ send full updated user object
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in Profile Updation",
      error: err.message,
    });
  }
};

// search=> how can we schedule this deletion operation
// delete account
exports.deleteAccount = async (req, res) => {
		try {
			// TODO: Find More on Job Schedule
			// const job = schedule.scheduleJob("10 * * * * *", function () {
			// 	console.log("The answer to life, the universe, and everything!");
			// });
			// console.log(job);
			console.log("Printing ID: ", req.user.id);
			const id = req.user.id;
			
			const user = await User.findById({ _id: id });
			if (!user) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
			// Delete Assosiated Profile with the User
			await Profile.findByIdAndDelete({ _id: user.additionalDetails });
			// TODO: Unenroll User From All the Enrolled Courses
			// Now Delete User
			await User.findByIdAndDelete({ _id: id });
			res.status(200).json({
				success: true,
				message: "User deleted successfully",
			});
		} catch (error) {
			console.log(error);
			res
				.status(500)
				.json({ success: false, message: "User Cannot be deleted successfully" });
		}
	};


exports.getAllUserDetails = async (req, res) => {
	try {
    const id = req.user.id;
    console.log(id) 
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


	exports.updateDisplayPicture = async (req, res) => {
		try {
		const displayPicture = req.files.displayPicture
		const userId = req.user.id
		const image = await uploadImageToCloudinary(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			1000
		)
		console.log(image)
		const updatedProfile = await User.findByIdAndUpdate(
			{ _id: userId },
			{ image: image.secure_url },
			{ new: true }
		)
		res.send({
			success: true,
			message: `Image Updated successfully`,
			data: updatedProfile,
		})
		} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
		}
	};
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
       .populate({
    path: "courses",
    populate: {
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    },
  })
  .exec();
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
         }
};

exports.instructorDashboard = async(req,res) => {
  try {
    const courseDetails = await Course.find({instructor:req.user.id});
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = Array.isArray(course.studentsEnrolled)
  ? course.studentsEnrolled.length
  : 0;

      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // create a new obj with the additional field 
      const courseDataWithStats = {
         _id:course._id,
         courseName : course.courseName,
         courseDescription : course.courseDescription,
         totalStudentsEnrolled,
         totalAmountGenerated
      }
      return courseDataWithStats;
    })

    res.status(200).json({
      courses:courseData
    })
 
  }
   catch (err) {
    console.log(err)
    res.status(500).json({
      message:err.message
    })
   }
}