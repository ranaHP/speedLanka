import {IloginDetails, loginDetailsType} from "../Interfaces/inteface";
import {DELETE_USER_LOGIN, SET_USER_LOGIN} from "../constants/CheckoutConstants";

const initialState: StoreType = {
    loginDetails: ""
}

export interface StoreType {
    loginDetails:  string
}

const localLoginData = (login_details: string ) => {
    localStorage.setItem('loginData', JSON.stringify({loginDetails: login_details}));
}


const getLocalStorage = (): StoreType => {
    const localLoginData = localStorage.getItem("loginData");
    if (localLoginData) {
        return JSON.parse(localLoginData);
    } else {
        return initialState
    }
}

export const LoginReducer = (state: StoreType = getLocalStorage(), action: loginDetailsType) => {
    switch (action.type) {
        case SET_USER_LOGIN: {
            localLoginData(action.payload);
            console.log(action.payload)
            return {
                ...state,
                loginDetails: action.payload
            }

        }
        case DELETE_USER_LOGIN: {
            localStorage.removeItem("loginData");
            return {
                ...state,
                loginDetails: ""
            }
        }
        default: {
            return state;
        }

    }
}