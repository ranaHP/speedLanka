import {IFormData} from "../../types/MainTypes";
import {ADD_FAV_POST_ITEM, DELETE_FAV_POST_ITEM} from "../constants/CheckoutConstants";
import {AddFavPostItemType, DeleteOrderItemType} from "../Interfaces/inteface";

export const addFavPostItem = (postItem: IFormData): AddFavPostItemType => {
    return {
        type: ADD_FAV_POST_ITEM,
        payload: postItem
    }
}

export const deletePostItem = (index: string): DeleteOrderItemType => {
    return {
        type: DELETE_FAV_POST_ITEM,
        payload: index
    }
}


