import { CURRENT_FILE, GET_FILES, SET_LABELING_METHOD} from "./types";
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
        let formData = new FormData();

        formData.append("file", fileName);
        formData.append("labelingMethod", labelingMethod);
        formData.append("attrName", attrName);
        formData.append("attrValue", attrValue);
        formData.append("greater", greater);
        formData.append("smaller", smaller);
        const res = await axios.post("http://localhost:8080/labelling", formData, {
            headers: {
                "Content-Type": "application/json",
            }
        }); 

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
