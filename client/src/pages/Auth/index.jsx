import React, { useState } from "react";
import authImage from "../../assets/auth.png";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className="h-screen flex">
      <form className="w-2/5 h-full justify-center px-28 flex flex-col">
        <h1 className="text-fontcolor text-3xl font-extrabold my-6">{isSignUp?"Sign Up":"Sign In"}</h1>
        {isSignUp && 
        <div className="flex flex-col my-2">
          <label htmlFor="username" className="text-sm font-semibold text-fontcolor mb-2">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Ashley, Brock,..."
            className="border-2 border-gray-200 py-2 rounded-lg outline-none px-4 text-other"
            />
        </div>
        }
        <div className="flex flex-col my-2">
          <label htmlFor="email" className="text-sm font-semibold text-fontcolor mb-2">Email</label>
          <input
            type="text"
            id="email"
            placeholder="user.mail@gmail.com"
            className="border-2 border-gray-200 py-2 rounded-lg outline-none px-4 text-other"
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="password" className="text-sm font-semibold text-fontcolor mb-2">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••••••••••"
            className="border-2 border-gray-200 py-2 rounded-lg outline-none px-4 text-other"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-primary py-2 text-md rounded-lg my-2"
        >
            {isSignUp?"Sign Up":"Sign In"}
        </button>
        <p className='text-fontcolor text-sm mt-2 text-center'>{isSignUp ? "Already have an account?" : "New to ShortMonkey?"} <span className='text-blue-700 text-md font-semibold cursor-pointer hover:underline' onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? "Sign In" : "Sign Up Now"}</span></p>
      </form>
      <div className="w-3/5 h-screen flex justify-center items-center py-4">
        <img src={authImage} className="h-full" alt="auth-image"/>
      </div>
    </div>
  );
};

export default Auth;
