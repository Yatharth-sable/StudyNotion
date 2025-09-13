import ContactUsForm from "../components/common/ContactUsForm";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { FaEarthAsia } from "react-icons/fa6";
import Footer from "../components/common/footer"

const contactInfo = [
  {
    id: 1,
    title: "Chat on us",
    description: "Our friendly team is here to help.",
    detail: "studynotion@mail address",
    icon: <IoChatboxEllipses> </IoChatboxEllipses>, // you can replace this with your icon component or name
  },
  {
    id: 2,
    title: "Visit us",
    description: "Come and say hello at our office HQ.",
    detail: "123, MG Road, Bangalore , Karnataka , India",
    icon: <FaEarthAsia></FaEarthAsia>
  },
  {
    id: 3,
    title: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    detail: "91235 96489",
    icon: <IoCall></IoCall>
  },
];

const ContactUs = () => {
  return (
    <div className="w-full text-white flex flex-col mt-20 text-md">
      {/* section 1 form and chat us */}
      <section className="w-11/12 flex flex-row gap-24" >
        {/* for chat */}
        <div className="bg-richblack-800 p-9 h-fit gap-8 w-[30%] ml-28 flex  flex-col rounded-lg ">
          { contactInfo.map((data, index) => (
            
            <div key={index}>
              <div className="flex flex-row items-center gap-2">
                <p className="text-richblack-100 text-xl">{data.icon} </p>
               <h1 className="text-lg font-semibold text-richblack-5"> {data.title} </h1> 
              </div>

              <div className="text-richblack-300 flex flex-col ml-7 text-sm">
               <p>{data.description} </p> 
              <p className="font-semibold">{data.detail}</p>  
                </div>

              <div>
                </div>
            </div>
          ))}
        </div>

        {/* for form */}
        <div className='  border border-richblack-600 rounded-lg p-10 ml-20 w-[60%]  '>
            <div className="ml-10">
                 <h1 className="text-4xl font-bold text-richblack-5 mb-2 ">
          Got a Idea? We've got the skills.
          <br />
           Let's team up
          </h1>
      <p className="text-richblack-200 ">
           Tell us more about yourself and what you're got in mind.
          </p>  
            </div>
       
           <div className="gap-5 flex flex-col mt-10">
        <ContactUsForm></ContactUsForm>
       </div>
    </div>
      </section>

       {/* section 2 */}
       {/* review */}
       <section></section>

       {/* section 3  footer */}
       <div className="mt-12">
        <Footer></Footer>
       </div>

    </div>
  );
};

export default ContactUs;
