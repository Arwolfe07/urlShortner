import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
  const { urlname } = useParams();
  const serverUrl = import.meta.env.VITE_APP_SERVER_URL;
  const redirect = () => {
    let url = serverUrl + `/url/redirect/${urlname}`;
    window.location.replace(url);
  };

  useEffect(() => {
    if (urlname) {
      redirect();
    }
  }, [urlname]);

  return <div>Redirect....</div>;
};

export default Redirect;
