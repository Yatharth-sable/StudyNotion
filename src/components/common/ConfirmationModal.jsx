import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[320px] rounded-md bg-richblack-800 p-6 text-white shadow-lg border border-richblack-700">
        {/* Heading */}
        <p className="text-lg font-semibold mb-2">{modalData.text1}</p>

        {/* Subtext */}
        <p className="text-sm text-richblack-300 mb-6">{modalData.text2}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <IconBtn
            text={modalData.btnText1}
            onClick={modalData?.btn1Handler}
          />
          <button
            onClick={modalData?.btn2Handler}
            className="px-4 py-2 rounded-md border border-richblack-600 text-richblack-200 hover:bg-richblack-700 transition-all duration-200"
          >
            {modalData?.btnText2}
          </button>
        </div>
      </div>
    </div>
    
  );
  
};

export default ConfirmationModal;
