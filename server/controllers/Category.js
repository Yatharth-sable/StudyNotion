const Category = require("../models/Category")

// create category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      })
    }

    const categoryDetails = await Category.create({ name, description })

    console.log("Category Details =>", categoryDetails)
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      categoryDetails,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Category creation failed",
    })
  }
}
exports.showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, { name: true, description: true });
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("🔥 SHOW ALL CATEGORIES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
      error: error.message,
    });
  }
};


// category page details
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // Find selected category and its published courses
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (selectedCategory.courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this category",
      });
    }

    // Get all other categories except the selected one
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    // Helper: random int
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    // Pick one random different category with published courses
    let differentCategory = null;
    if (categoriesExceptSelected.length > 0) {
      differentCategory = await Category.findById(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec();
    }

    // Get most enrolled courses across all categories
    const allCategories = await Category.find().populate({
    path: "courses",
    populate: {
      path: "instructor",   // field in Course model
      select: "firstName lastName email image" // choose what to return
    }
  })
  .exec(); 
    const allCourses = allCategories.flatMap((category) => category.courses);

    const mostSellingCourses = allCourses
      .filter((course) => course.status === "Published")
      .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      selectedCategory,
      differentCategory,
      mostSellingCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
