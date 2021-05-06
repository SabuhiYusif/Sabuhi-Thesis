import { SUCCESS_MESSAGE } from "../../actions/types"

export const closeSuccess = (dispatch, service) => {
    dispatch({
        type: SUCCESS_MESSAGE,
        payload: { isSuccessfull: false, message: '' ,service: service}
    })
}
