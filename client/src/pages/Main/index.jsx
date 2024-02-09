import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { setLoad } from "../../store/loadSlice";
import { createUrl, deleteUrl, getAllUrls } from "../../actions/urlActions";
import copy from "copy-to-clipboard";
import clip from "../../assets/clip.webp";

import del from "../../assets/del.svg";

const Main = () => {
  const load = useSelector((store) => store.loading);
  const urls = useSelector((store) => store.urls);
  const longUrl = useRef();
  const code = useRef();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (urls.length >= 10) {
      return enqueueSnackbar("Max limit reached. Please delete some URLs.");
    }
    if (!longUrl.current.value) {
      return enqueueSnackbar("Please add a URL", { variant: "error" });
    }
    if (code.current.value > 8) {
      return enqueueSnackbar("The short url cannot be more than 8 characters", {
        variant: "error",
      });
    }
    dispatch(setLoad(true));
    dispatch(
      createUrl({
        originalUrl: longUrl.current.value,
        uniqueName: code.current.value,
      })
    );
    code.current.value = "";
    longUrl.current.value = "";
  };
  useEffect(() => {
    dispatch(getAllUrls());
  }, []);

  const copyHandler = (item) => {
    copy(item);
    enqueueSnackbar(`Copied ${item} to clipboard`, { variant: "success" });
  };
  const deleteHandler = (id) => {
    dispatch(setLoad(true));
    dispatch(deleteUrl(id));
  };
  const left = useSpring({
    from: {
      y: 100,
      opacity: 0,
    },
    to: {
      y: 0,
      opacity: 1,
    },
    delay: 1500,
    config: {
      tension: 210,
      friction: 30,
    },
  });
  const right = useSpring({
    from: {
      y: -100,
      opacity: 0,
    },
    to: {
      y: 0,
      opacity: 1,
    },
    delay: 1500,
    config: {
      tension: 210,
      friction: 30,
    },
  })
  return (
    <div className="h-screen w-screen py-20 flex flex-col xl:flex-row items-center">
      <animated.div style={left} className="lg:w-1/2 h-full flex justify-center items-center">
        <form className="bg-white xl:shadow-lg rounded-md lg:mx-12 px-8 pt-6 pb-8 mt-4">
          <h1 className="text-fontcolor text-3xl font-extrabold text-center mb-4">
            Shorten URLs
          </h1>
          <div className="flex flex-col my-2">
            <label
              htmlFor="original"
              className="text-sm font-semibold text-fontcolor mb-2"
            >
              Enter a URL
            </label>
            <input
              type="text"
              id="original"
              placeholder="Paste your long URL here"
              className="border-2 border-gray-200 py-2 rounded-lg outline-none px-4 text-other"
              ref={longUrl}
            />
          </div>
          <div className="flex flex-col my-2">
            <label
              htmlFor="code"
              className="text-sm font-semibold text-fontcolor mb-2"
            >
              Create a personalised URL (Optional)
            </label>
            <div className="w-full">
              <input
                type="text"
                disabled
                placeholder={window.location.href}
                className="cursor-not-allowed border-2 w-1/3 border-gray-200 py-2 border-r-0 bg-gray-100 rounded-l-lg outline-none px-4 text-other cursor-none"
              />
              <input
                type="text"
                id="code"
                placeholder="your personalised name"
                className="border-2 border-gray-200 py-2 w-2/3 rounded-r-lg outline-none px-4 text-other"
                ref={code}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 text-white bg-primary py-2 text-md rounded-lg my-2 hover:bg-indigo-500 duration-300"
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
              <span>Create</span>
            )}
          </button>
        </form>
      </animated.div>
      <animated.div style={right} className="xl:w-1/2 sm:w-3/4 w-5/6 h-full xl:mr-8 rounded-md text-md">
        <h1 className="text-center text-xl p-2 tracking-tighter font-extrabold text-fontcolor">
          Your URLs (max. 10){" "}
        </h1>
        <div className="border-2 border-primary rounded-t-md py-2 w-full flex justify-between px-4 text-md bg-primary font-bold text-white">
          <span className="w-1/2">Original URL</span>
          <span>Short URL</span>
          <span>Action</span>
        </div>
        <div className="w-full  border-2 border-t-0 rounded-b-md">
          {urls?.length == 0 ? (
            <p className="text-md py-2 text-center font-bold border-b-2 rounded-md text-fontcolor">
              No URLs yet
            </p>
          ) : (
            <>
              {urls?.map((url) => (
                <div
                  className="w-full border-b-2 px-4 flex justify-between text-sm py-2"
                  key={url._id}
                >
                  <span className="w-1/2 overflow-hidden text-ellipsis">
                    {url.fullUrl}
                  </span>
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    className="w-fit text-primary"
                  >
                    {url.short}
                  </a>
                  <div className="w-6 h-6 flex mr-6">
                    <img
                      src={clip}
                      className="w-6 h-6 mr-2 cursor-pointer"
                      alt="img"
                      onClick={() => copyHandler(url.shortUrl)}
                    />
                    <img
                      src={del}
                      alt="delete"
                      className="w-6-h-6 mr-4 cursor-pointer"
                      onClick={() => deleteHandler(url._id)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </animated.div>
    </div>
  );
};

export default Main;
