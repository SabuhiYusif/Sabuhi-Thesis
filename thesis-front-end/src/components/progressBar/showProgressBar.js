import { REQUEST_COMPLETED } from "../../actions/types";

export const showProgressBar = (dispatch, service) => {
    dispatch({
        type: REQUEST_COMPLETED,
        payload: { status: 'LOADING', service: service }
    })
}
