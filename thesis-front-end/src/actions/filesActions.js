import axios from "axios";
import { hideProgressBar } from "../components/progressBar/hideProgressBar";
import { showProgressBar } from "../components/progressBar/showProgressBar";
import { GET_ALL_FILES, GET_ERRORS } from "./types";


export const fetchAllFiles = (pageName) => async dispatch => {
    try {
        showProgressBar(dispatch, 'VALIDATING')
        const res = await axios.get("/get-all-files", {
            params: {
                "page": pageName
            }
        });

        dispatch({
            type: GET_ALL_FILES,
            payload: res.data
        })
        hideProgressBar(dispatch)
    } catch (error) {
        hideProgressBar(dispatch)
        if (error.message == "Network Error") {
            dispatch({
                type: GET_ERRORS,
                payload: error.message
            })
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        }
    }
};
