import { enqueueSnackbar } from "notistack";
import * as api from "../apis";
import { addUrls, getUrls } from "../store/urlsSlice";
import { setLoad } from "../store/loadSlice";

export const getAllUrls = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUrls();
    dispatch(getUrls(data));

    dispatch(setLoad(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoad(false));
    enqueueSnackbar(error?.response?.data.message, { variant: "error" });
  }
};

export const createUrl = (urlData) => async (dispatch) => {
  try {
    const { data } = await api.createUrl(urlData);
    dispatch(addUrls(data));
    enqueueSnackbar("Successfully created new URL", { variant: "success" });
    dispatch(setLoad(false));
    getAllUrls();
  } catch (error) {
    console.log(error);
    dispatch(setLoad(false));
    enqueueSnackbar(error?.response?.data.message, { variant: "error" });
  }
};

export const deleteUrl = (urlId) => async (dispatch) => {
  try {
    const { data } = await api.deleteUrl(urlId);
    enqueueSnackbar(data?.message, { variant: "success" });
    dispatch(getAllUrls());
    dispatch(setLoad(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoad(false));
    enqueueSnackbar(error?.response?.data.message, { variant: "error" });
  }
};
