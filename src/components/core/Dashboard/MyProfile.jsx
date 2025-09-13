import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { MdEdit } from "react-icons/md";
import { formattedDate } from "../../../utils/dateFormatter"


const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="text-richblack-5 space-y-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-richblack-25">My Profile</h1>

      {/* Section 1: Basic Info */}
      <div className="bg-richblack-800 p-6 rounded-md flex w-full items-center justify-between border border-richblack-700">
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <p className="text-xl font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-richblack-300">{user?.email}</p>
          </div>
        </div>

        <IconBtn
          text="Edit"
          onClick={() => navigate("/dashboard/settings")}
          editIcon={true}
        />
      </div>

      {/* Section 2: About */}
      <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700 space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">About</p>
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            editIcon={true}
          />
        </div>
        <p className="text-richblack-300">
          {user?.additionalDetails?.about ?? "Write Something about Yourself"}
        </p>
      </div>

      {/* Section 3: Personal Details */}
      <div className="bg-richblack-800 p-6 rounded-md border border-richblack-700 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">Personal Details</p>
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}  
            editIcon={true}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-richblack-300">
          <div>
            <p className="text-sm text-richblack-200">First Name</p>
            <p className="text-richblack-5">{user?.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-richblack-200">Last Name</p>
            <p className="text-richblack-5">{user?.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-richblack-200">Email</p>
            <p className="text-richblack-5">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-richblack-200">Gender</p>
            <p className="text-richblack-5">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
          <div>
            <p className="text-sm text-richblack-200">Phone Number</p>
            <p className="text-richblack-5">
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
