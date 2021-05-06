import { REQUEST_COMPLETED } from "../../actions/types"

export const hideProgressBar = (dispatch) => {
    dispatch({
        type: REQUEST_COMPLETED,
        payload: { status: 'COMPLETED', service: 'UNKNOWN'}
    })
}
