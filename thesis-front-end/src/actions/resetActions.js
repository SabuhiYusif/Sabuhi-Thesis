import axios from "axios";
import { hideProgressBar } from "../components/progressBar/hideProgressBar";
import { showProgressBar } from "../components/progressBar/showProgressBar";

export const resetAll = () => async dispatch => {

    showProgressBar(dispatch, "VALIDATING")
    await axios.delete("http://localhost:8080/reset-all")

    hideProgressBar(dispatch)
};
