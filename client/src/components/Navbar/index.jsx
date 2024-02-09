import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { animated, useSpring } from "@react-spring/web";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setCurrentUser } from "../../store/userSlice";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const nav_animation = useSpring({
    from: {
      y: -100,
      opacity: 0,
    },
    to: {
      y: 0,
      opacity: 1,
    },
    config: {
      duration: 400,
    },
  });
  

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/",{replace:true});
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logoutHandler();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/",{replace: true});
    }
  }, []);
  return (
    <animated.nav style={nav_animation} className="fixed text-fontcolor border-b-2 z-30 w-screen max-w-screen gradient-overlay-header py-2 sm:py-4 px-2 sm:px-10 lg:px-24 flex justify-between items-center justify-center">
      <Link className="flex items-center" to="/main">
        <img src={logo} className="w-8 h-8 mr-2" />
        <p className="relative text-lg md:text-3xl sm:text-2xl font-extrabold tracking-tighter cursor-pointer">
          <span className="text-primary">Short</span>Monkey
        </p>
      </Link>
      <div className="mt-2 flex justify-between  z-30 items-center px-4 ">
        <div className="flex items-center">
          <button
            className="bg-primary text-sm py-2 px-2 tracking-tighter sm:tracking-normal sm:px-4 rounded-lg font-semibold hover:bg-indigo-500 duration-150 text-white"
            onClick={logoutHandler}
          >
            Sign Out
          </button>
        </div>
      </div>
    </animated.nav>
  );
};

export default Navbar;
