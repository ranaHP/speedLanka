import {IFormData} from "../../types/MainTypes";
import {FavPostListType} from "../Interfaces/inteface";
import {ADD_FAV_POST_ITEM, DELETE_FAV_POST_ITEM} from "../constants/CheckoutConstants";

const initialState: StoreType = {
    favPostList:[]
}

interface  StoreType {
    favPostList: IFormData []
}

const updateLocalStorage = (favPostList: IFormData[]) => {
    localStorage.setItem('favPostList', JSON.stringify({favPostList:favPostList}));
}


const getLocalStorage = ():StoreType => {
    const localHostData = localStorage.getItem("favPostList");
    if(localHostData){
        const data = JSON.parse(localHostData);
        return data;
    }else {
        return initialState
    }

}

export const FavPostList = (state:StoreType = getLocalStorage(), action: FavPostListType) => {
    switch (action.type) {
        case ADD_FAV_POST_ITEM:{
            const index = state.favPostList.findIndex((postItem:IFormData) => postItem._id == action.payload._id);
            if(index == -1){
                updateLocalStorage([...state.favPostList, action.payload]);
                return{
                    ...state,
                    favPostList:[...state.favPostList, action.payload]
                }
            }else {
                const updated: IFormData[] = state.favPostList.slice();
                updated[index] = action.payload;
                updateLocalStorage(updated);
                return{
                    ...state,
                    favPostList:updated
                }
            }

        }
        case DELETE_FAV_POST_ITEM:{
            const postList  =  state.favPostList.filter((postItem: IFormData, index: number) => postItem._id !== action.payload);
            updateLocalStorage(postList);
            
            return{
                ...state,
                favPostList: postList
            }
        }
        default:{
            return state;
        }

    }
}