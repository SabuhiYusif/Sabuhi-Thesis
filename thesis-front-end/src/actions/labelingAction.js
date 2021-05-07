import { CURRENT_FILE, GET_FILES, SET_LABELING_METHOD } from "./types";
import axios from "axios";
import { hideProgressBar } from "../components/progressBar/hideProgressBar";
import { showSuccess } from "../components/alerts/showSuccess";
import { showProgressBar } from "../components/progressBar/showProgressBar";

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
        const res = await axios.post("api/labeling",
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
    } catch (err) {
        // showSuccess(dispatch)
        hideProgressBar(dispatch)
    }
};
