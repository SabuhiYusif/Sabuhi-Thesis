import { CURRENT_FILE, GET_ERRORS, GET_FILES, SET_LABELING_METHOD } from "./types";
import axios from "axios";
import { hideProgressBar } from "../components/progressBar/hideProgressBar";
import { showSuccess } from "../components/alerts/showSuccess";
import { showProgressBar } from "../components/progressBar/showProgressBar";
import { BASE_URL } from "./urls";


export const setLabelingMethod = (labelingMethod) => async dispatch => {
    dispatch({
        type: SET_LABELING_METHOD,
        payload: labelingMethod
    })
};
const service = 'LABELING'

export const labelLog = (fileName, labelingMethod, attrName, attrValue, greater, smaller) => async dispatch => {
    showProgressBar(dispatch, service)
    try {
        const res = await axios.post(`${BASE_URL}api/labeling`,
            {
                fileName: fileName,
                labelingMethod: labelingMethod,
                attrName: attrName,
                attrValue: attrValue,
                greater: greater,
                smaller: smaller
            }
        );

        dispatch({
            type: GET_FILES,
            payload: res.data
        })

        dispatch({
            type: CURRENT_FILE,
            payload: Object.keys(res.data)[0]
        })

        hideProgressBar(dispatch)
        showSuccess(dispatch, "Log labeled successfully", service)
    } catch (error) {
        if (error.message !== "Network Error") {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        } else {
            dispatch({
                type: GET_ERRORS,
                payload: { "error": error.message }
            })
        }
        hideProgressBar(dispatch)
    }
};
