import Highlight from "../HomePage/Highlight";
import CTAButton from "../HomePage/CTAButton";

const learningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for ",
    HighLight: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: " Industry Based Curriculum ",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description: "The learning process uses the namely online and offline.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    order: 4,
    heading: 'Rating "Auto-grading"',
    description:
      "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto lg:grid-cols-4   grid-1 mb-10 w-[90%]  mt-20 text-richblack-5">
      {learningGridArray.map((card, index) => (
        <div
          key={index}
          className={` ${index === 0 && "lg:col-span-2"}
        ${card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
        ${card.order < 0 && "bg-transparent"}
        ${index === 3 && "lg:col-start-2"}
        `}
        >
          {card.order < 0 ? (
            <div className="ml-10 ">
              <div className="text-4xl font-semibold m-2 py-5 ">
                {card.heading}
                <br />
                <Highlight text={card.HighLight}></Highlight>
                <p className="text-richblack-300 text-lg font-normal pt-4 w-[80%]">{card.description}</p>
              </div>

                <div className="w-fit font-semibold mt-3 ml-2 mb-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
            </div>
          ) : (
            <div className="w-full pb-24   p-12 gap-y-8 flex flex-col">

                <h1 className="font-semibold text-xl text-richblack-5">{card.heading}</h1>
                <p className="font-normal  text-normal text-richblack-200  ">{card.description}</p>
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default LearningGrid;
