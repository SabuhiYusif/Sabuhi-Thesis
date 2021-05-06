import { GET_ATTR_NAMES, GET_ATTR_VALUES } from "../actions/types";
import {  } from "../actions/types";

const initialState = {
    attrNames: [],
    attrValues: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ATTR_NAMES: 
            return {
                ...state,
                attrNames: action.payload
            }
        case GET_ATTR_VALUES: 
            return {
                ...state,
                attrValues: action.payload
            }
        default:
            return state;
    }
}
