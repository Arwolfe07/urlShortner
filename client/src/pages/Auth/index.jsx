import React, { useEffect, useRef, useState } from "react";
import authImage from "../../assets/auth.png";
import { animated, useSpring } from "@react-spring/web";
import logo from "../../assets/logo.png";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUsername,
  checkValidForm,
} from "../../components/utils/checkValidForm";
import { login, signup } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { setLoad } from "../../store/loadSlice";
import { setCurrentUser } from "../../store/userSlice";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const user = useSelector((store) => store.user);
  const email = useRef();
  const name = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const load = useSelector((store) => store.loading);
  const imgStyle = useSpring({
    from: {
      opacity: 0,
      x: 50,
    },
    to: {
      opacity: 1,
      x: 0,
    },
    delay: 1500,
    config: {
      tension: 210,
      friction: 30,
    },
  });

  const formStyle = useSpring({
    from: {
      x: -100,
      opacity: 0,
    },
    to: {
      x: 0,
      opacity: 1,
    },
    delay: 1500,
    config: {
      tension: 210,
      friction: 30,
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const emailVal = email.current.value;
    const passwordVal = password.current.value;

    const isNotValid = checkValidForm(emailVal, passwordVal);
    if (isNotValid) {
      return enqueueSnackbar(isNotValid, { variant: "warning" });
    }
    if (isSignUp) {
      const isNotName = checkUsername(name.current.value);
      if (isNotName) {
        return enqueueSnackbar(isNotName, { variant: "warning" });
      }
      const authData = {
        name: name.current.value,
        email: emailVal,
        password: passwordVal,
      };
      dispatch(setLoad(true));
      dispatch(signup(authData, navigate));
    } else {
      const authData = {
        email: emailVal,
        password: passwordVal,
      };
      dispatch(setLoad(true));
      dispatch(login(authData, navigate));
    }
  };
  useEffect(() => {
    if (localStorage.getItem("Profile")) {
      navigate("/main",{replace: true});
    }
  }, []);

  return (
    <div className="h-screen md:flex items-center">
      <animated.form
        className="md:w-2/5 h-full justify-center px-8 sm:px-16 md:px-6 lg:px-14 xl:px-28 flex flex-col"
        style={formStyle}
      >
        <div className="md:absolute top-8 left-8 flex w-full md:w-fit flex-col md:flex-row justify-center items-center">
          <img src={logo} alt="logo" className="w-6 h-6" />
          <p className="ml-2 font-bold text-fontcolor text-xl md:text-base">
            <span className="text-primary">Short</span>Monkey
          </p>
        </div>
        <h1 className="text-fontcolor text-3xl font-extrabold my-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        {isSignUp && (
          <div className="flex flex-col my-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-fontcolor mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Ashley, Brock,..."
              className="border-2 border-gray-200 py-2 rounded-lg outline-none px-4 text-other"
              ref={name}
            />
          </div>
        )}
        <div className="flex flex-col my-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-fontcolor mb-2"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="user.mail@gmail.com"
            className="border-2 border-gray-200 py-2 rounded-lg outline-none px-4 text-other"
            ref={email}
          />
        </div>
        <div className="flex flex-col my-2">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-fontcolor mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••••••••••"
            className="border-2 border-gray-200 py-2 rounded-lg outline-none px-4 text-other"
            ref={password}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-primary py-2 text-md rounded-lg my-2 hover:bg-indigo-500 duration-300"
          onClick={submitHandler}
          disabled={load ? true : false}
        >
          {load ? (
            <svg
              className="animate-spin mx-auto h-6 w-6 text-white-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-50"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
          )}
        </button>
        <p className="text-fontcolor text-sm mt-2 text-center">
          {isSignUp ? "Already have an account?" : "New to ShortMonkey?"}{" "}
          <span
            className="text-blue-700 text-md font-semibold cursor-pointer hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up Now"}
          </span>
        </p>
      </animated.form>
      <animated.div
        className="w-3/5 px-12 lg:h-screen h-3/4 hidden md:block flex justify-center items-center py-4"
        style={imgStyle}
      >
        <img src={authImage} className="h-full w-4/5" alt="auth-image" />
      </animated.div>
    </div>
  );
};

export default Auth;
