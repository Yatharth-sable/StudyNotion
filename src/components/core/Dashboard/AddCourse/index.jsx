import RenderSteps from "./RenderSteps"

export default function AddCourse () {
  return (
    <div className="min-h-screen w-full bg-richblack-900 text-white">
      <div className="mx-auto max-w-7xl  py-10">
        {/* Header */}
        <h1 className="mb-8 text-3xl font-bold text-richblack-5">Add Course</h1>

        <div className="grid grid-cols-1 gap-10 w lg:grid-cols-3 ">
          {/* Left: Steps + Form */}
          <div className="lg:col-span-2">
            <RenderSteps />
          </div>

          {/* Right: Upload Tips */}
          <div className=" flex-[1.2] rounded-xl  border h-fit  border-richblack-700 bg-richblack-800 p-6  shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-yellow-50">⚡ Course Upload Tips</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-richblack-200">
              <li>Set the Course Price option or make it free.</li>
              <li>Standard size for the course thumbnail is 1024x576.</li>
              <li>Video section controls the course overview video.</li>
              <li>Course Builder is where you create & organize a course.</li>
              <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
              <li>Information from the Additional Data section shows up on the course single page.</li>
              <li>Make Announcements to notify important notes to all enrolled students at once.</li>
            </ul>
          </div>  
        </div>
      </div>
    </div>
  )
}
