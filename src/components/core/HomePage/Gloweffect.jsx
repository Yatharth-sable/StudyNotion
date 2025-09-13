import React from 'react'

const Gloweffect = ({width,height}) => {

   
  return (

    <div>
       <div
           className="absolute top-0 left-1/2 -translate-x-1/2 z-0 rounded-full blur-[100px] opacity-[0.23]
            w-[400px] h-[200px]
            sm:w-[800px] sm:h-[500px]
            md:w-[800px] md:h-[300px]
            lg:w-[1000px] lg:h-[550px]"

            style={{
              background:
                "radial-gradient(ellipse at center, #1FA2FF, #12D8FA, #A6FFCB)",
            }}
          ></div>

    </div>
  )
}

export default Gloweffect
