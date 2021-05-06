import { SUCCESS_MESSAGE } from "../actions/types";

const initialState = {
    alert: {
        isSuccessfull: false,
        service: 'UNKNOWN',
        message: ''
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SUCCESS_MESSAGE:
            return {
                ...state,
                alert: action.payload
            };
        default:
            return state;
    }
}
