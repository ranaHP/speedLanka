import React from "react";
import { Navbar} from "react-bootstrap";
import { Star} from "react-feather";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/rootReducers";
import {IFormData, IFormDataResponse} from "../../../types/MainTypes";

const Cart : React.FC = () => {
    const favPostList: IFormDataResponse [] = useSelector((state: RootState) => state.favPostListReducer.favPostList);
    return (
        <Navbar.Brand className="cart">
            <Star size={28} />

            {/*{*/}
            {/*    checkoutList && <div className="cart-badge">{checkoutList.length}</div>*/}
            {/*}*/}
            <div className="cart-badge">{favPostList.length}</div>
        </Navbar.Brand>
    );
}
export default Cart;