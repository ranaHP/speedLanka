import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {FavPostList} from "./FavPostList";
import { LoginReducer } from "./LoginReducer";
import {TempPostItem} from "./TempPostItem";
import {AlertItemReducer} from "./AlertSystem";

const rootReducer = combineReducers( {
    favPostListReducer: FavPostList,
    loginReducer: LoginReducer,
    tempPostReducer: TempPostItem,
    alertItemReducer: AlertItemReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeWithDevTools());