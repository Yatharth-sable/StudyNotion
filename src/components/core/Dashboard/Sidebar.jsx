import {sidebarLinks} from "../../../data/dashboard-links"
import { useDispatch, useSelector } from 'react-redux'
import {logout} from "../../../services/operation/authApi"
import SidebarLink from './SidebarLink'
import { VscSettingsGear } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {VscSignOut} from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

  const {user, loading :profileLoading} = useSelector ((state) => state.profile) 
  const {loading :authLoading} = useSelector ((state) => state.auth) 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal,setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return  <div className='mt-10'>
           Loading...
          </div>
  }

  return (
    <div>
      <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 
      h-[calc(100vh-2.5rem)] bg-richblack-800 py-10 text-richblack-300 '>
         <div className=' flex flex-col'>
                 {
                    sidebarLinks.map((link,index) => {
                        if(link.type && user?.accountType !== link.type ) return null; 
                        return(
                            <SidebarLink key={index} link={link} iconName={link.icon}></SidebarLink> 
                        )
                    })
                 }
         </div>
         <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 '></div>
 
        <div className='flex flex-col '>
             <SidebarLink link={{name:"Settings",path:"dashboard/settings"}} iconName="VscSettingsGear"></SidebarLink>
        </div>

       <button 
        onClick={() => setConfirmationModal( {
            text1:"Are You Sure",
            text2: " You will be logout out of your Account",
            btnText1:"Logout",
            btnText2:"Cancel",
            btn1Handler: () => dispatch (logout(navigate)),
            btn2Handler: () => setConfirmationModal(null)
        })}
        className='text-sm font-medium text-richblack-300'
       > 
        <div className='flex items-center gap-x-2 ml-8 mt-2'>
          <VscSignOut className="text-lg" ></VscSignOut>
          <span> Logout</span>
        </div>  

       </button>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>}
    </div>
  )
} 
export default Sidebar
