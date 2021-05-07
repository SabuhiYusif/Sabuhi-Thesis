import axios from "axios";
import fileDownload from 'js-file-download';
import { hideProgressBar } from "../components/progressBar/hideProgressBar";


export const downloadLog = (fileName) => async dispatch => {
    let formData = new FormData();

    formData.append("fileName", fileName);
    const res = await axios.post("api/download", formData, {
        responseType: 'blob',
    });

    const data = await res.data
    const downloadfile = new File([data], "log" + fileName);
    fileDownload(downloadfile, 'log.xes');
    
    hideProgressBar(dispatch)
};


export const downloadSettingsLog = () => async dispatch => {

    const res = await axios.post("api/download-settings", {
        responseType: 'blob',
    });

    const data = await res.data

    const downloadfile = new File([data],  "settings");
    fileDownload(downloadfile, 'settings.cfg');

    hideProgressBar(dispatch)
};
