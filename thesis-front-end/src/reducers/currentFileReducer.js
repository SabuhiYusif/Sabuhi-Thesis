import { CURRENT_FILE } from "../actions/types";

const initialState = "";

export default function (state = initialState, action) {
    switch (action.type) {
        case CURRENT_FILE:
            return action.payload
        default:
            return state;
    }
}
