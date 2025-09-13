import { FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse";
 
const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <div>
      {/* Stepper */}
      <div className="mb-10 flex items-center justify-between ml-24">
        {steps.map((item, index) => (
          <div key={item.id} className="flex flex-1 items-center">
            {/* Circle + Label stacked */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold
                ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-800 text-yellow-50"
                    : step > item.id
                    ? "border-yellow-50 bg-yellow-50 text-richblack-900"
                    : "border-richblack-600 bg-richblack-700 text-richblack-300"
                }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>
              <p
                className={`mt-2 text-sm font-medium ${
                  step === item.id ? "text-yellow-50" : "text-richblack-300"
                }`}
              >
                {item.title}
              </p>
            </div>

            {/* Line connector (except last) */}
            {index !== steps.length - 1 && (
              <div className="flex-1 border-t-2 border-dashed border-richblack-600"></div>
            )}
          </div>
        ))}
      </div>

      {/* Conditional Rendering */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
};

export default RenderSteps;
