import axios from "axios";
import { showSuccess } from "../components/alerts/showSuccess";
import { hideProgressBar } from "../components/progressBar/hideProgressBar";
import { showProgressBar } from "../components/progressBar/showProgressBar";
import { GET_ERRORS } from "./types";

export const setSettingsConfiguration = (settings) => async dispatch => {
    showProgressBar(dispatch, 'SETTINGS')
    try {
        console.log(settings)
        await axios.post("/write-to-settings", settings);

        hideProgressBar(dispatch)
        showSuccess(dispatch, "success", "SETTINGS")
    } catch (err) {
        hideProgressBar(dispatch)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
};