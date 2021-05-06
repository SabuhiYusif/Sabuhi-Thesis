import { GET_FILES, GET_ALL_FILES } from "../actions/types";
import { addToFiles } from "../helpers/addToFiles";

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FILES:
            return addToFiles(action.payload, state)
        case GET_ALL_FILES:
            return action.payload
        default:
            return state;
    }
}
