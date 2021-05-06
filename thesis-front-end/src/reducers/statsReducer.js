import { GET_STATS, GET_INITIAL_STATS, SET_LABELING_METHOD } from "../actions/types";

const initialState = {
    stats: [[],[]],
    initialStats: [],
    labelingMethod: 'default'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STATS:
            return {
                ...state,
                stats: action.payload
            };
        case GET_INITIAL_STATS:
            return {
                ...state,
                initialStats: action.payload
            }
        case SET_LABELING_METHOD:
            return {
                ...state,
                labelingMethod: action.payload
            }
        default:
            return state;
    }
}
