import { combineReducers } from "redux";
import statsReducer from "./statsReducer";
import errorReducer from "./errorReducer";
import filesReducer from "./filesReducer";
import progressBarReducer from "./progressBarReducer";
import alertsReducer from "./alertsReducer";
import eventAttrsReducer from "./eventAttrsReducer";
import traceAttributesReducer from "./traceAttributesReducer";
import currentFileReducer from "./currentFileReducer";

export default combineReducers({
    errors: errorReducer,
    stats: statsReducer,
    files: filesReducer,
    request: progressBarReducer,
    traceAttributes: traceAttributesReducer,
    currentFile: currentFileReducer,
    events: eventAttrsReducer,
    alerts: alertsReducer,
});
