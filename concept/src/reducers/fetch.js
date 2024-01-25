import {
    FETCH_FAILURE,
    FETCH_REQUEST,
    FETCH_SUCCESS
} from "../actions/";

export default (state = {
    resources: []
}, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                isFetching: true,
                fetchError: false
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                resources: state.resources.concat(action.data)
            };
        case FETCH_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true
            };
        default:
            return state;
    }
};