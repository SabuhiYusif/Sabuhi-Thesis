import { REQUEST_COMPLETED } from "../actions/types";

const initialState = {
    request: {
        status: 'COMPLETED',
        service: 'UNKNOWN'
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_COMPLETED:
            return action.payload
            
        default:
            return state;
    }
}
