import { GET_EVENT_ATTRS } from "../actions/types";
const initialState = {
    attributeNames: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EVENT_ATTRS:
            return {
                ...state,
                attributeNames: action.payload
            };
        default:
            return state;
    }
}
