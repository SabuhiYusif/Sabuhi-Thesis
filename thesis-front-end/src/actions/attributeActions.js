import axios from "axios";
import { hideProgressBar } from "../components/progressBar/hideProgressBar";
import { showProgressBar } from "../components/progressBar/showProgressBar";
import { GET_ERRORS, GET_ATTR_NAMES, GET_ATTR_VALUES, GET_EVENT_ATTRS } from "./types";
import { BASE_URL } from "./urls";

export const getAttrNamesOfLog = (file, labelingMethod) => async dispatch => {
    showProgressBar(dispatch, 'LABELING')
    try {
        const res = await axios.post(`${BASE_URL}api/attributes-names`,
            {
                fileName: file,
                labelingMethod: labelingMethod.toUpperCase()
            }
        );

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
        const res = await axios.post(`${BASE_URL}api/attributes-values`,
            {
                fileName: file,
                attributeKey: attributeKey
            }
        );

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
        const res = await axios.get(`${BASE_URL}api/get-event-attributes`, {
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
