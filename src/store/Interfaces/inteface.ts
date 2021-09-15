import {
    ADD_FAV_POST_ITEM, ALERT_SYSTEM_SHOW, DELETE_FAV_POST_ITEM,
    DELETE_USER_LOGIN,
    SET_USER_LOGIN, UPDATE_TEMP_POST_ITEM
} from "../constants/CheckoutConstants";
import {IFormData} from "../../types/MainTypes";

export interface AddFavPostItemType {
    type: typeof ADD_FAV_POST_ITEM
    payload: IFormData
}

export interface DeleteOrderItemType {
    type: typeof DELETE_FAV_POST_ITEM
    payload: string
}

export type FavPostListType = AddFavPostItemType | DeleteOrderItemType;

export interface SetLoginUseType {
    type: typeof SET_USER_LOGIN
    payload: string
}

export interface RemoveLoginUSerType {
    type: typeof DELETE_USER_LOGIN
    payload: number
}

export type loginDetailsType = SetLoginUseType | RemoveLoginUSerType;

export interface updateTempPostItem {
    type: typeof UPDATE_TEMP_POST_ITEM
    payload: IFormData
}

export interface IloginDetails {
    _id: string,
    name: string,
    email: string,
    address: string,
    password: string,
    contact: string,
    status: string,
    roll: string,
    __v: number
}

export interface IAlertSystem{
    isShow: boolean
    type: string
    message:string
    title:string
}
export interface alertSystem {
    type: typeof ALERT_SYSTEM_SHOW
    payload: IAlertSystem
}