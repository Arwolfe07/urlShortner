import { enqueueSnackbar } from "notistack";
import * as api from "../apis";
import { authorizeUser } from "../store/userSlice";
import { setLoad } from "../store/loadSlice";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(authData);
    dispatch(authorizeUser(data));
    dispatch(setLoad(false));
    navigate(`/main`, {replace: true});
    enqueueSnackbar("Successfully logged in", { variant: "success" });
  } catch (error) {
    // console.log(error);
    dispatch(setLoad(false));
    enqueueSnackbar(error?.response?.data.message, { variant: "error" });
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(authData);
    dispatch(authorizeUser(data));
    dispatch(setLoad(false));
    navigate(`/main`,{replace: true});
    enqueueSnackbar("Successfully logged in", { variant: "success" });
  } catch (error) {
    // console.log(error);
    dispatch(setLoad(false));
    enqueueSnackbar(error?.response?.data.message, { variant: "error" });
  }
};
