import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./../Slice/authSlice"
import cartReducer from "./../Slice/cartSlice"
import profileReducer from "./../Slice/profileSlice"
import courseReducer from "./../Slice/courseSlice"
import viewCourseReducer from "./../Slice/viewCourseSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  cart:cartReducer,
  profile:profileReducer,
  course:courseReducer,
  viewCourse:viewCourseReducer,
});

export default rootReducer;
