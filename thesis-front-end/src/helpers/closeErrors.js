import { GET_ERRORS } from "../actions/types"


export const closeErrors = (dispatch) => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    })
}