import {IFormData} from "../../types/MainTypes";
import {updateTempPostItem} from "../Interfaces/inteface";
import {UPDATE_TEMP_POST_ITEM} from "../constants/CheckoutConstants";

const initialState: StoreType = {
    tempPostItem:[
        {
            cType:"",
            sellerContact:"",
            images:"",
            desc:"",
            location:"",
            displayNumber:"",
            sellerVerified:"",
            approved:"",
            price:"",
            date:"",
            attribute:[],
            sellerName:"",
            _id:"",
            title:""
        }
    ]
}

interface  StoreType {
    tempPostItem: IFormData []
}


export const TempPostItem = (state:StoreType = initialState, action: updateTempPostItem) => {
    switch (action.type) {
        case UPDATE_TEMP_POST_ITEM:{
            return{
                ...state,
                tempPostItem:[action.payload]
            }
        }
        default:{
            return state;
        }

    }
}