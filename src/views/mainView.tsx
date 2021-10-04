import React, {useEffect, useState} from 'react';
import Home, {IGetUserSearchPost} from "./Home";
import MainNavBar from "../components/mainNavBar/MainNavBar";
import Footer from "../components/footer/Footer";
import Login from "./Login";
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import Register from "./Register";
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducers";
import HomeFooter from "../components/Home/HomeFooter/HomeFooter";
import HomeHeader from "../components/Home/HomeHeader/HomeHeader";
import {useQuery} from "@apollo/client";
import {GET_ALL_POST_LIMIT, Get_Search_POST} from "../api/user/queries";
import {IFormDataResponse} from "../types/MainTypes";


const MainView: React.FC = () => {


    return (
        <>
            <div className="search-product-home">
                <HomeHeader/>
                <Home/>
                <HomeFooter/>
            </div>
        </>
    );
}

export default MainView;