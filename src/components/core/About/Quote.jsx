import React from 'react'
import Highlight from "../HomePage/Highlight"

const Quote = () => {
  return (
    <div className='text-center'> 
            {/* <span className="text-5xl text-richblack-700"></span> */}
       We are passionate about revolutionizing the way we learn. Our innovative  <br /> platform
      
       <Highlight text={" combines technology "}></Highlight>
       <span className='bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-semibold'> expertise </span> 
        and community to
        <br />
         create an
       <span className='bg-gradient-to-bl from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-semibold '>
           {" "}unparalleled educational experience
       </span>
    </div>
  )
}

export default Quote
