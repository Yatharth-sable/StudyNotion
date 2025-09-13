import React from "react";
import signupimg from "../assets/Images/signup.webp";
import Template from "../components/core/loginSignup/Template";

const SignUp = ({ setIsLoggedIn }) => {
  return (
    <div>
      <Template
        title="Join the millions learning to code with StudyNotion for free"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        signImg={signupimg}
        formType="signUp"
        setIsLoggedIn={setIsLoggedIn}

      ></Template>
    </div>
  );
};

export default SignUp;
