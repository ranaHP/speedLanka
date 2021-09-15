import React, {useEffect} from 'react';
import Home from "./Home";
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


const MainView: React.FC = () => {
    const loginDetail: {loginDetails:string} = useSelector((state: RootState) => state.loginReducer);
    let { path, url } = useRouteMatch();

    return (
        <>
            <MainNavBar componentType={"2"}/>
            <Home/>
            <Footer/>
        </>
    );
}

export default MainView;