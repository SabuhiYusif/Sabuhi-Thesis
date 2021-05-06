import axios from "axios";
import { showSuccess } from "../components/alerts/showSuccess";
import { hideProgressBar } from "../components/progressBar/hideProgressBar";
import { showProgressBar } from "../components/progressBar/showProgressBar";
import { CURRENT_FILE, GET_FILES } from "./types";

const service = 'SPLITTING'
export const splitLog = (splitPerc, fileName, splitMethod, kValue) => async dispatch => {
    try {
        showProgressBar(dispatch, service)
        let formData = new FormData();

        formData.append("splitPerc", splitPerc);
        formData.append("fileName", fileName);
        formData.append("splitMethod", splitMethod);
        formData.append("kValue", parseInt(kValue));
        const res = await axios.post("/split", formData, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(res.data)
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
