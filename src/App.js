import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword"
import UpdatePassword from "./Pages/UpdatePassword"
import VerifyEmail from "./Pages/VerifyEmail";
import OpenRoute from "./components/core/loginSignup/OpenRoute";
import {  useState } from "react";
import Navbar from "./components/common/Navbar";

import AboutPage from "./Pages/AboutPage";
import ContactUs from "./Pages/ContactUs";
import Dashboard from "./Pages/Dashboard"
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/loginSignup/PrivateRoute";
import Error from "./Pages/Error"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import PurchaseHistory from "./components/core/Dashboard/PurchaseHistory"
import Settings from "./components/core/Dashboard/Settings/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import ChangeProfilePicture from "./components/core/Dashboard/Settings/ChangeProfilePicture";
import Cart from "./components/core/Dashboard/Cart/index.jsx"
import MyCourse from "./components/core/Dashboard/MyCourses.jsx";
import AddCourse from "./components/core/Dashboard/AddCourse/index.jsx";
import EditCourse from "./components/core/Dashboard/EditCourse/index.jsx";
import Catalog from "./Pages/Catalog.jsx";
import CourseDetails from "./Pages/CourseDetails.jsx"
import ViewCourse from "./Pages/ViewCourse.jsx";
import VideoDetails from "./components/core/ViewCourse/VideoDetails.jsx";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor.jsx";

function App() {

  const { user } = useSelector((state) => state.profile);


    const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="flex flex-col font-inter w-full min-h-[100vh] bg-richblack-900 overflow-x-hidden">
      <Navbar></Navbar> 
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn}></Home>}></Route>
        <Route path="catalog/:catalogName" element={<Catalog></Catalog>}></Route>
        <Route path="course/:courseId" element={<CourseDetails></CourseDetails>}></Route>
        <Route path="/login" element={ <OpenRoute><Login> </Login> </OpenRoute>}></Route>
        <Route path="/signup" element={<OpenRoute><SignUp> </SignUp> </OpenRoute>}></Route>
        <Route path="/forgot-password" element={<OpenRoute><ForgotPassword> </ForgotPassword> </OpenRoute>}></Route>
        <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword> </UpdatePassword> </OpenRoute>}></Route>
        <Route path="/verify-email" element={<OpenRoute><VerifyEmail> </VerifyEmail> </OpenRoute>}></Route>
        <Route path="/about" element={<AboutPage> </AboutPage>}></Route>
        <Route path="/contact" element={<ContactUs> </ContactUs>}></Route>
        <Route path="*" element={<Error> </Error>}></Route>

         <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/updateDisplayPicture" element={<ChangeProfilePicture />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
          <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses"element={<EnrolledCourses />} />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
          <Route path="dashboard/my-courses" element={<MyCourse />} />
              <Route path="dashboard/add-course"element={<AddCourse />} />
              <Route path="dashboard/edit-course/:courseId"element={<EditCourse />} />
              <Route path="dashboard/instructor"element={<Instructor />} />
            </>
          )}
        </Route>   


        <Route element={<PrivateRoute>
          <ViewCourse></ViewCourse>
        </PrivateRoute>}>
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
            <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails></VideoDetails>}
            >
             </Route>
            </>
          )
        }
        </Route>


      </Routes>
    </div>
  );
}

export default App;
