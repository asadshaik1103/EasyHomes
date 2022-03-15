import {LOGIN_REQUEST, SUCCESS, FAILURE} from './authTypes';

export const authenticateUser = (email, password) => {
    return dispatch => {
        dispatch(loginRequest());
        console.log("Hello");
        if(email === "test" && password === "test"){

            console.log("success");
            return dispatch(success());
        } else {
            return dispatch(failure());
        }
    };
};

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
}

const success = () => {
    return {
        type: SUCCESS,
        payload: true
    };
};

const failure = () => {
    return {
        type: FAILURE,
        payload: false
    }
}