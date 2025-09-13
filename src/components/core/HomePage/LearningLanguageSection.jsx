import React from 'react'
import Highlight from './Highlight'
import KnowProgres from "../../../assets/Images/Know_your_progress.svg"
import PlanLesson from "../../../assets/Images/Plan_your_lessons.svg"
import CompareOthers from "../../../assets/Images/Compare_with_others.svg"
import CTAButton from './CTAButton'

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-20'>

        <div className='flex flex-col gap-5'>
            <div className='text-4xl font-semi text-center'>
                Your swiss Knife for 
              <Highlight text={" learning any language "} ></Highlight>
            </div>
            <div className='font-medium text-base text-center text-richblack-600 mx-auto w-[70%]'>
                   Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>
        </div>

         <div className='flex-col flex lg:flex-row md:gap-4 gap-2 items-center justify-center mt-6'>
              <img src={KnowProgres} alt="KnowProgres_img" className='lg:-mr-36 drop-shadow-xl'/>
              <img src={CompareOthers} alt="CompareOthers_img" className='mt-34 drop-shadow-xl' />
              <img src={PlanLesson} alt="PlanLesson_img" className='lg:-ml-40 sm:-ml-20 drop-shadow-xl'/>
         </div>

         <div className='mx-auto my-auto justify-center items-center w-fit mt-5 '>
            <CTAButton active={true} linkto={"/signup"}>
             Learn More
            </CTAButton>
         </div>
    </div>
  )
}

export default LearningLanguageSection
