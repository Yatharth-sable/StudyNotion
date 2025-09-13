import React from "react";
import loginImg from "../assets/Images/login.webp";
import Template from "../components/core/loginSignup/Template";

const Login = ({ setIsLoggedIn }) => {
  return (
    <div>
      <Template
        title="Welcome Back"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        loginImg={loginImg}
        formType="login"
        setIsLoggedIn={setIsLoggedIn}
      ></Template>
    </div>
  );
};

export default Login;
