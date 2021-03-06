import axios from "axios";
import { GET_STATS, GET_INITIAL_STATS, GET_ERRORS, GET_FILES, CURRENT_FILE } from "./types";
import { hideProgressBar } from "../components/progressBar/hideProgressBar";
import { showProgressBar } from "../components/progressBar/showProgressBar";
import { showSuccess } from "../components/alerts/showSuccess";
import { BASE_URL } from "./urls";

export const getFullStats = (
    fileName,
    payload,
    classifier,
    maxDepth,
    minSamples,
    coverageThreshold,
    resultFile,
    IA,
    declare,
    seq,
    hybrid
) => async dispatch => {
    showProgressBar(dispatch, 'VALIDATING')

    try {

        const res = await axios.post(`${BASE_URL}api/evaluate`,
            {
                fileName: fileName,
                payload: payload,
                classifier: classifier,
                maxDepth: maxDepth,
                minSamples: minSamples,
                coverageThreshold: coverageThreshold,
                individualActivities: IA,
                declare: declare,
                sequence: seq,
                hybrid: hybrid
            }
        );

        dispatch({
            type: GET_FILES,
            payload: res.data
        })

        const res2 = await axios.get(`${BASE_URL}api/get-results`, {
            params: {
                "fileName": Object.values(resultFile)[0]
            }
        });

        dispatch({
            type: GET_STATS,
            payload: res2.data
        })

        dispatch({
            type: CURRENT_FILE,
            payload: fileName
        })

        hideProgressBar(dispatch)
    } catch (error) {
        hideProgressBar(dispatch)
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
    }
};

export const getResults = (resultFile) => async dispatch => {
    showProgressBar(dispatch, 'VALIDATING')

    try {
        const res = await axios.get(`${BASE_URL}api/get-results`, {
            params: {
                "fileName": Object.values(resultFile)[0]
            }
        });
        dispatch({
            type: GET_STATS,
            payload: res.data
        })
        if (res.data[1].length !== 0) {
            showSuccess(dispatch, "Evaluation completed successfully!", "VALIDATING")
        }
        hideProgressBar(dispatch)
    } catch (error) {
        hideProgressBar(dispatch)
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
    }
};

export const getInitialStats = (file) => async dispatch => {
    try {
        showProgressBar(dispatch, 'UPLOADING')

        let formData = new FormData();

        formData.append("file", file);
        const res = await axios.post(`${BASE_URL}api/file-stats`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        dispatch({
            type: GET_INITIAL_STATS,
            payload: res.data
        })
        hideProgressBar(dispatch)

    } catch (error) {
        hideProgressBar(dispatch)

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
    }
};

export const getCurrentFileInitialStats = (fileName) => async dispatch => {
    try {
        showProgressBar(dispatch, 'UPLOADING')

        let formData = new FormData();


        formData.append("fileName", fileName);
        const res = await axios.post(`${BASE_URL}api/curr-file-stats`, { fileName: fileName });

        dispatch({
            type: GET_INITIAL_STATS,
            payload: res.data
        })
        hideProgressBar(dispatch)

    } catch (error) {
        hideProgressBar(dispatch)

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
    }
};
