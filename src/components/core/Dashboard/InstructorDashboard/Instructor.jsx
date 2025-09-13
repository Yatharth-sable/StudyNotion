import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operation/courseDetailsApi';
import { getInstructorData } from '../../../../services/operation/profileApi';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const Instructor = () => {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      if (instructorApiData.length) setInstructorData(instructorApiData);
      if (result) setCourses(result);

      setLoading(false);
    };
    getCourseDataWithStats();
  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated, 
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled, 
    0
  );

  return (
    <div className="text-white space-y-6">
      
      {/* Greeting */}
      <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold">Hi {user?.firstName} 👋</h1>
        <p className="text-slate-400">Let’s start something new</p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#38BDF8]"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-10">
          
          {/* Chart + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Chart Card */}
            <InstructorChart courses={instructorData} />

            {/* Stats */}
            <div className="bg-slate-800 rounded-2xl p-6 shadow-md flex flex-col gap-6">
              <div className="text-center">
                <p className="text-slate-400">Total Courses</p>
                <p className="text-2xl font-bold text-yellow-50">{courses.length}</p>
              </div>
              <div className="text-center">
                <p className="text-slate-400">Total Students</p>
                <p className="text-2xl font-bold text-yellow-50">{totalStudents}</p>
              </div>
              <div className="text-center">
                <p className="text-slate-400">Total Income</p>
                <p className="text-2xl font-bold text-yellow-50">Rs. {totalAmount}</p>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="bg-slate-800 rounded-2xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Your Courses</p>
              <Link 
                to="/dashboard/my-courses" 
                className="text-[#38BDF8] hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course, index) => (
                <div 
                  key={index} 
                  className="bg-slate-900 rounded-xl overflow-hidden shadow hover:scale-[1.02] transition-transform"
                >
                  <img 
                    src={course.thumbnail} 
                    alt={course.courseName} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <p className="font-semibold">{course.courseName}</p>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mt-2">
                      <p>{course.studentsEnrolled.length} Students</p>
                      <span>|</span>
                      <p>₹{course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-slate-800 p-6 rounded-2xl text-center shadow-md">
          <p className="mb-4">You have not created any course yet</p>
          <Link 
            to="/dashboard/add-course" 
            className="px-4 py-2 bg-[#38BDF8] text-black rounded-lg font-medium hover:bg-[#0ea5e9] transition-colors"
          >
            Create Course
          </Link>
        </div>
      )}
    </div>
  )
}

export default Instructor
