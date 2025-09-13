const express = require("express")
const router = express.Router();
const{getCourseDetails,getFullCourseDetails,showAllCourses,createCourse,editCourse,getInstructorCourses,
     deleteCourse,deleteAllInstructorCourses} = require("../controllers/Course")
const{createRating,getAverageRating,getAllRating} = require("../controllers/RatingAndReview")
const{createCategory,showAllCategories,categoryPageDetails} = require("../controllers/Category")

const{deleteSection,updateSection,createSection} = require("../controllers/Section")
const{createSubSection,updateSubSection,deleteSubSection} = require("../controllers/SubSection")

// Middleware
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

const {updateCourseProgress}  = require("../controllers/CourseProgress")

// Courses can Only be Created by Instructors
router.post("/createCourse",auth,isInstructor,createCourse)
router.post("/editCourse", auth, isInstructor, editCourse)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.delete("/deleteAllInstuctorCourses", auth, isInstructor,deleteAllInstructorCourses)


// add a section to the course
router.post("/addSection", auth, isInstructor, createSection)

// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Update a delete
router.post("/deleteSection", auth, isInstructor, deleteSection)

// Edit subsection
router.post("/createSubSection", auth, isInstructor, createSubSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection/", auth, isInstructor, deleteSubSection)
router.delete("/deleteCourse", deleteCourse)
router.post("/updateCourseProgress", auth,isStudent,updateCourseProgress)

// get all registed course
router.get("/getAllCourses", showAllCourses)

// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.post("/getCategoryPageDetails", categoryPageDetails)


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// category only created by the admin
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories",  showAllCategories);
router.post("/categoryPageDetails",  categoryPageDetails);

// ********************************************************************************************************
//                                    Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)


module.exports = router
