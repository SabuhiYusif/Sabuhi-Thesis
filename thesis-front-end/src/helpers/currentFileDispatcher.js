import { CURRENT_FILE, SUCCESS_MESSAGE } from "../actions/types"

export const currentFileDispatcher = (dispatch, file) => {
    dispatch({
        type: CURRENT_FILE,
        payload: file
    })
    dispatch({
        type: SUCCESS_MESSAGE,
        payload: { isSuccessfull: false, message: '', service: "UNKNOWN"}
    })
}
