import axios from "axios";
import { showSuccess } from "../components/alerts/showSuccess";
import { hideProgressBar } from "../components/progressBar/hideProgressBar";
import { showProgressBar } from "../components/progressBar/showProgressBar";
import { CURRENT_FILE, GET_FILES } from "./types";

const service = 'SPLITTING'
export const splitLog = (splitPerc, fileName, splitMethod, kValue) => async dispatch => {
    try {
        showProgressBar(dispatch, service)
        const res = await axios.post("api/split",
            {
                splitPerc: splitPerc,
                fileName: fileName,
                splitMethod: splitMethod,
                kValue: parseInt(kValue)
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
        showSuccess(dispatch, "Log has been splitted successfully", service)
    } catch (err) {
        hideProgressBar(dispatch)
    }
};
