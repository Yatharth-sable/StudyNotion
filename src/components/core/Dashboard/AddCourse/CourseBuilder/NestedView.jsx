import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operation/courseDetailsApi";
import { setCourse } from "../../../../../Slice/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // delete section
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
    },
    token);
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  // delete sub-section
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId,courseId :course._id }, token);
    if (result) {
      
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  return (
    <div className="rounded-lg bg-richblack-800 p-4">
      {course?.courseContent?.map((section) => (
        <details
          key={section._id}
          className="mb-3 rounded-md border border-richblack-600 bg-richblack-700"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-x-3 px-4 py-3 text-richblack-50">
            {/* Left side */}
            <div className="flex items-center gap-x-3">
              <RxDropdownMenu className="text-yellow-50" />
              <p className="font-medium">{section.sectionName}</p>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-x-3 text-richblack-200">
              <button
                onClick={() =>
                  handleChangeEditSectionName(section._id, section.sectionName)
                }
                className="hover:text-yellow-50"
              >
                <MdEdit />
              </button>

              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Delete this section",
                    text2: "All the lectures in this section will be deleted",
                    btnText1: "Delete",
                    btnText2: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className="hover:text-pink-200"
              >
                <RiDeleteBin6Line />
              </button>

              {/* Arrow rotates when open */}
              <BiSolidDownArrow className="transition-transform duration-200 group-open:rotate-180" />
            </div>
          </summary>

          {/* Sub-sections */}
          <div className="px-6 py-2 space-y-2">
            {section.subSection?.map((data) => (
              <div
                key={data?._id}
                onClick={() => setViewSubSection(data)}
                className="flex cursor-pointer items-center justify-between rounded-md border border-richblack-600 bg-richblack-800 px-4 py-2 hover:bg-richblack-700"
              >
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu className="text-yellow-50" />
                  <p>{data.title}</p>
                </div>

                <div className="flex items-center gap-x-3 text-richblack-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditSubSection({ ...data, sectionId: section._id });
                    }}
                    className="hover:text-yellow-50"
                  >
                    <MdEdit />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmationModal({
                        text1: "Delete this sub section",
                        text2: "Selected lecture will be deleted",
                        btnText1: "Delete",
                        btnText2: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSubSection(data._id, section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                    className="hover:text-pink-200"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))}

            {/* Add lecture */}
            <button
              onClick={() => setAddSubSection(section._id)}
              className="mt-2 flex items-center gap-x-2 rounded-md px-2 py-1 text-sm font-medium text-yellow-50 hover:bg-richblack-600"
            >
              <AiOutlinePlus />
              <span>Add Lecture</span>
            </button>
          </div>
        </details>
      ))}

      {/* Modals */}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </div>
  );
};

export default NestedView;
