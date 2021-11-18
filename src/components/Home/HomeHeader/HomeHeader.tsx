import React, {useEffect, useState} from 'react';
import {Button, Image} from "react-bootstrap";
import PostImage from '../../../asset/images/logo/logo.jpg';
import logo from "../../../asset/images/logo/mainWithoutTextLogo.png";
import SriLankanFlag from "../../../asset/images/flag/sri-lanka.svg";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import {useJwt} from "react-jwt";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducers";
import Cart from "../../mainNavBar/cartBTN/Cart";
import {IloginDetails} from "../../../store/Interfaces/inteface";
import jwt_decode from "jwt-decode";
import {deleteLoginDetails} from "../../../store/actions/LoginActions";
const HomeHeader : React.FC = ( ) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loginDetailsDecodes, setLoginDetailsDecodes] = useState<IloginDetails[] | null>( null);
    const loginDetail: {loginDetails:string}  = useSelector((state: RootState) => state.loginReducer);

    const handleOnCheckIsLoged = () => {
        if(!loginDetailsDecodes){
            history.push("/login");
        }else{
            history.push("/dashboard/create-post-home");
        }
    }

    const parseJwt =  (token: string) => {
        try{
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }catch (e) {
            return  "nodata";
        }
    };
    useEffect(() => {
        if(parseJwt(loginDetail.loginDetails) == "nodata"){
            setLoginDetailsDecodes(null)
        }else {
            setLoginDetailsDecodes(parseJwt(loginDetail.loginDetails))
        }
    }, [loginDetail]);



    return (
        <div className="user-home-header">
            <div className="logo">
                <Image src={logo} width="100%"/>
                <div className="logoName"> SPEEDLANKA</div>
            </div>
            <div className="user-home-navbar">
                <Link to="/">Home</Link>
                <Link to="/wedding/all/75/18/all/all/all">Wedding</Link>
                <Link to="/product/all/all/all">Buy</Link>
                <div style={{cursor: "pointer"}}
                     onClick={handleOnCheckIsLoged}
                     className="special-nav">Post Ads</div>

            </div>
            <div className="user-home-login-register">
                {/*<div className="language">*/}

                {/*    <Image src={SriLankanFlag} width="30px"/>*/}
                {/*</div>*/}
                {!loginDetailsDecodes &&
                    <>
                        <Link to="/register" ><div className="register-btn">
                            Register
                        </div></Link>

                        <Link to="/login" ><div className="login-btn">
                            Login
                        </div></Link>
                    </>

                }
                {loginDetailsDecodes &&
                <>
                    <Link to="/dashboard" ><div className="register-btn">
                       Dashboard
                    </div></Link>

                    <div className="login-btn" onClick={() => {

                        dispatch(deleteLoginDetails(1));
                        history.push("/");

                    }}>
                        Logout
                    </div>
                </>

                }


            </div>
        </div>
    )
}
export default HomeHeader;