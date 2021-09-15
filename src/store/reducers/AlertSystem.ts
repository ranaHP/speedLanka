import {IFormData} from "../../types/MainTypes";
import {alertSystem, IAlertSystem, updateTempPostItem} from "../Interfaces/inteface";
import {ALERT_SYSTEM_SHOW, UPDATE_TEMP_POST_ITEM} from "../constants/CheckoutConstants";

const initialState: StoreType = {
    alertItem:[]
}

interface  StoreType {
    alertItem: IAlertSystem []
}


export const AlertItemReducer = (state:StoreType = initialState, action: alertSystem) => {
    switch (action.type) {
        case ALERT_SYSTEM_SHOW:{
            return{
                ...state,
                alertItem:[action.payload]
            }
        }
        default:{
            return state;
        }

    }
}