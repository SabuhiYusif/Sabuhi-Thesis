import axios from "axios";
import { hideProgressBar } from "../components/progressBar/hideProgressBar";
import { showProgressBar } from "../components/progressBar/showProgressBar";
import { GET_ERRORS, GET_ATTR_NAMES, GET_ATTR_VALUES, GET_EVENT_ATTRS } from "./types";

export const getAttrNamesOfLog = (file, labelingMethod) => async dispatch => {
    showProgressBar(dispatch, 'LABELING')
    try {
        let formData = new FormData();

        formData.append("file", file);
        formData.append("labelingMethod", labelingMethod.toUpperCase())
        const res = await axios.post("http://localhost:8080/attributes-names", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        dispatch({
            type: GET_ATTR_NAMES,
            payload: res.data
        })
        hideProgressBar(dispatch)
    } catch (err) {
        hideProgressBar(dispatch)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
};

export const getAttrValuesOfLog = (file, attributeKey) => async dispatch => {
    showProgressBar(dispatch, 'LABELING')
    try {
        let formData = new FormData();

        formData.append("file", file);
        formData.append("attributeKey", attributeKey)
        const res = await axios.post("http://localhost:8080/attributes-values", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        dispatch({
            type: GET_ATTR_VALUES,
            payload: res.data
        })
        hideProgressBar(dispatch)
    } catch (err) {
        hideProgressBar(dispatch)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
};

export const fetchEventAttrNames = (fileName) => async dispatch => {
    showProgressBar(dispatch, 'VALIDATING')
    try {
        let formData = new FormData();

        console.log("==============")
        console.log(fileName)
        formData.append("fileName", fileName);
        const res = await axios.get("http://localhost:8080/get-event-attributes", {
            params: {
                "fileName": fileName
            }
        });

        dispatch({
            type: GET_EVENT_ATTRS,
            payload: res.data
        })
        hideProgressBar(dispatch)
    } catch (err) {
        hideProgressBar(dispatch)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
};
