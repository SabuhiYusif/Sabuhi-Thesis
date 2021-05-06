
import { SUCCESS_MESSAGE } from "../../actions/types"

export const showSuccess = (dispatch, message, service) => {
    dispatch({
        type: SUCCESS_MESSAGE,
        payload: { isSuccessfull: true, message: message, service: service }
    })
}

