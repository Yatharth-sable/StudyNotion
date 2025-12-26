require("dotenv").config();
const express = require("express")
const app = express();

const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")
const paymenRoutes = require("./routes/Payment")
const courseRoutes = require("./routes/Course")

const {cloudinaryConnect} = require("./config/cloudinary")
const database = require("./config/database")
  
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const cors = require("cors");

const PORT = process.env.PORT || 3000

// middleware
app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
  "http://localhost:3000",
  "https://studynotion-frontend-eight-psi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,  
  })
);

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/temp"
    })
)

// connection with the database
database.connect();

// connection with the cloudinary
cloudinaryConnect();
console.log("this is mail user2",process.env.MAIL_USER)
// api route mount krna hai 
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymenRoutes)

// activate the server
app.listen( PORT , () => {
  console.log(`app is the running on ${PORT}`)
})

app.get("/",(req,res) => {
  res.send("Server is running ✅" + PORT);
})

const cloudinary = require("cloudinary").v2;

app.get("/test-cloudinary", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://www.rgare.com/images/default-source/kc-article-images/chat-gpt.png?sfvrsn=9b68414d_4", // koi bhi public image
      { folder: "test_folder" }
    );

    return res.json({
      success: true,
      message: "Cloudinary working fine 🚀",
      url: result.secure_url,
    });
    
  } catch (err) {
    console.error("Cloudinary error:", err);
    return res.status(500).json({
      success: false,
      message: "Cloudinary not working ❌",
      // error: err.message,
    });
  }
});

