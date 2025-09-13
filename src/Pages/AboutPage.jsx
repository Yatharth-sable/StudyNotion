import Highlight from "../components/core/HomePage/Highlight";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/About/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Stats from "../components/core/About/Stats"
import LearningGrid from "../components/core/About/LearningGrid";
import ContactForms from "../components/core/About/ContactForms";
import Footer  from "../components/common/footer";

const AboutPage = () => {
  return (
    <div className="text-white flex flex-col  items-center justify-center ">
      {/* Section 1  */}
      <section className="bg-richblack-800 w-full py-16 mb-10 pb-52">
        <div className="flex flex-col justify-center  items-center  relative ">
          <header className="text-[36px] font-semibold text-center ">
            Driving Innovation in Online Education for a
            <br />
            <Highlight text="Brighter Future"></Highlight>
            <p className="text-base text-richblack-300 font-normal pt-3 pb-10">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a <br />brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a <br />vibrant learning community.
            </p>
          </header>
          <div className="flex gap-x-7 justify-center w-auto  absolute translate-y-20 top-1/2 pt-10">
            <img src={aboutus2} alt="aboutus2" />
            <img src={aboutus3} alt="aboutus3" />
            <img src={aboutus1}  alt="aboutus1" />
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="mt-44 text-4xl text-center pb-20 border-b w-full text-richblack-5 border-richblack-700">
        <Quote></Quote>
      </section>

      {/* section 3 */}
      <section className=" flex-col  my-20 justify-center items-center ">
        {/* div for founding story */}
        <div className="flex flex-row gap-32  w-11/12 items-center justify-evenly ">
          {/* left part theory */}
          <div className="text-richblack-300 gap-y-9 w-[50%] pl-32 py-7">
            <h1 className="bg-gradient-to-br text-transparent bg-clip-text  from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-3xl font-semibold ">
              Our Founding Story
               </h1>
            <p className="mt-7">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <br />
            <p>
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>

          {/* right part img */}
          <div className="w-[40%] relative">

            <img
             src={FoundingStory} 
              className="relative z-10 rounded-lg"
               alt="FoundingStory"/>
              <div className="absolute inset-0 z-0 blur-2xl opacity-60 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 scale-110"></div>
          </div>
        </div>

        {/* div for our vision & mission */}
        <div className="flex flex-row mt-20 justify-between items-center pl-32 w-11/12  gap-32 text-richblack-300 ">
          {/* left part our vision */}
          <div className="  ">
            <h1 className='bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-semibold text-3xl pb-3'>Our Vision</h1>
            <p className="py-2">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>

          {/* right part our mission */}
          <div className=" pb-3 ">
            <h1 className='bg-gradient-to-bl from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-semibold text-3xl pb-2 '>Our Mission</h1>
            <p className="py-2" >
              Our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </section>
 
       {/* section 4  */}
       <section className="w-full mt-4" >
         <Stats></Stats>
       </section>

       {/* section 5 */}
       <section className="w-full ">
        <LearningGrid className="mx-auto flex flex-col items-center justify-between gap-5" ></LearningGrid>
        <ContactForms></ContactForms>
       </section>
            
            {/* section 6 */}
            <section className="w-full mt-32">

          <Footer className></Footer>
            </section>

    </div>
  );
};

export default AboutPage;
