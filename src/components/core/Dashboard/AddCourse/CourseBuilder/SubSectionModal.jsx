import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-hot-toast";
import Upload from "../CourseInformation/Upload";
import IconBtn from "../../../../common/IconBtn";
import { setCourse } from "../../../../../Slice/courseSlice";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operation/courseDetailsApi";

const SubSectionModal = ({ modalData,setModalData,add = false,view = false,edit = false,}) => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  // pre-fill when editing or viewing
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData?.title || "");
      setValue("lectureDesc", modalData?.description || "");
      // for video just pass URL to Upload for preview
      setValue("lectureVideo", null);
    }
  }, [view, edit, modalData, setValue]);

  // check if any changes made
  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData?.title ||
      currentValues.lectureDesc !== modalData?.description ||
      currentValues.lectureVideo // new file selected
    );
  };

  // edit subsection
  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo && currentValues.lectureVideo.length > 0) {
      formData.append("video", currentValues.lectureVideo); // ✅ fixed typo
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);

    if (result) {
      // if backend returns full course → just setCourse(result)
      dispatch(setCourse(result));
      toast.success("Lecture updated successfully");
    }
    setLoading(false);
    setModalData(null);
  };

  // form submit (create / edit)
  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
        return;
      }
      await handleEditSubSection();
      return;
    }

    // create new subsection
    const formData = new FormData();
    formData.append("courseId", course._id); 
    formData.append("sectionId", modalData.sectionId || modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo); // ✅ ensure FileList

    setLoading(true);
    const result = await createSubSection(formData, token);
    console.log("lectureVideo value:", data.lectureVideo);
console.log("FormData keys:");
for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}


    if (result) {
      // if backend returns full course → just setCourse(result)
      dispatch(setCourse(result));
      toast.success("Lecture created successfully");
    }
    setLoading(false);
    setModalData(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-full max-w-2xl rounded-2xl bg-richblack-800 p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b border-richblack-700 pb-3">
          <p className="text-lg font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button
            disabled={loading}
            onClick={() => setModalData(null)}
            className="text-richblack-200 hover:text-red-400"
          >
            <RxCross1 size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Upload video */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          {/* Title */}
          <div className="max-h-screen">
            <label
              htmlFor="lectureTitle"
              className="block text-sm font-medium text-richblack-5"
            >
              Lecture Title
            </label>
            <input
              type="text"
              id="lectureTitle"
              placeholder="Enter lecture title"
              {...register("lectureTitle", { required: true })}
              className="mt-1 w-full rounded-lg border border-richblack-600 bg-richblack-700 p-2 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-100"
            />
            {errors.lectureTitle && (
              <span className="text-sm text-red-400">
                Lecture Title is required
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="lectureDesc"
              className="block text-sm font-medium text-richblack-5"
            >
              Lecture Description
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Enter lecture description"
              {...register("lectureDesc", { required: true })}
              className="mt-1 w-full min-h-[100px] rounded-lg border border-richblack-600 bg-richblack-700 p-2 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-100"
            ></textarea>
            {errors.lectureDesc && (
              <span className="text-sm text-red-400">
                Lecture Description is required
              </span>
            )}
          </div>

          {/* Action button */}
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                text={
                  loading ? "Saving..." : edit ? "Save Changes" : "Save Lecture"
                }
                type="submit"
                disabled={loading}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
