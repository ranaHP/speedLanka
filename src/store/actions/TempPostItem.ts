import {IFormData} from "../../types/MainTypes";
import { UPDATE_TEMP_POST_ITEM} from "../constants/CheckoutConstants";
import { updateTempPostItem} from "../Interfaces/inteface";

export const updateTempPost = (postItem: IFormData): updateTempPostItem => {
    return {
        type: UPDATE_TEMP_POST_ITEM,
        payload: postItem
    }
}


