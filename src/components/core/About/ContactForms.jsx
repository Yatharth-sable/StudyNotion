import React from 'react'
import ContactUsForm  from '../../common/ContactUsForm'

const ContactForms = () => {
  return (
    <div className='text-center pt-24  '>
        <h1 className="text-3xl font-bold text-richblack-5 mb-2">
            Get in Touch
          </h1>
      <p className="text-richblack-200">
            We'd love to here for you, Please fill out this form.
          </p>  
           <div className="gap-5 flex flex-col mt-10">
        <ContactUsForm></ContactUsForm>
       </div>
      
    </div>
  )
}

export default ContactForms
