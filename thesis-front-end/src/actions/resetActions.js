import axios from "axios";
import { hideProgressBar } from "../components/progressBar/hideProgressBar";
import { showProgressBar } from "../components/progressBar/showProgressBar";
import { BASE_URL } from "./urls";

export const resetAll = () => async dispatch => {

    showProgressBar(dispatch, "VALIDATING")
    await axios.delete(`${BASE_URL}api/reset-all`)

    hideProgressBar(dispatch)
};
