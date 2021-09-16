import React, {useState, useEffect} from "react";
import {Col, Nav, Navbar, NavItem} from "react-bootstrap";
import Cart from "./cartBTN/Cart";
import Logout from "./LogoutBTN/LogoutBTN";
import Logo from "./Logo/Logo";
import Login from "./LoginBTN/LoginBTN";
import RegisterBTN from "./RegisterBTN/RegisterBTN";
import PostAds from "./PostAddBTN/PostAds";
import {useJwt} from "react-jwt";
import DashboardBTN from "./DashboardBTN/DashboardBTN";
import HomeBTN from "./HomeBTN/HomeBTN";
import {IFormData} from "../../types/MainTypes";
import {useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducers";
import {IloginDetails} from "../../store/Interfaces/inteface";

type  MainNavBarProps = {
    componentType: string
}

const MainNavBar: React.FC<MainNavBarProps> = (props) => {
    const {decodedToken, isExpired} = useJwt(JSON.parse(String(localStorage.getItem("loginData"))) ? JSON.parse(String(localStorage.getItem("loginData"))).loginDetails : JSON.parse(String(localStorage.getItem("loginData"))));
    const loginDetail: {loginDetails:string} = useSelector((state: RootState) => state.loginReducer);

    const [type, setType] = useState<string>("2");

    return (
        <Navbar className="main-navbar-container">
            <Col xs={12} sm={12} md={12} lg={11} xl={11} className="m-auto ">
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/*<Logo/>*/}
                    </Nav>
                    {
                        type == "22" &&
                        <>
                            <Nav>
                                <NavItem>
                                    Home
                                </NavItem>
                                <NavItem>
                                    Home
                                </NavItem>
                                <NavItem>
                                    Home
                                </NavItem>
                            </Nav>

                        </>
                    }

                    <Nav>


                        {/*{loginDetail.loginDetails &&*/}
                        {/*    <Cart/>*/}
                        {/*}*/}

                        {loginDetail.loginDetails && props.componentType == "2" &&
                            <DashboardBTN/>
                        }
                        {loginDetail.loginDetails && props.componentType == "1" &&
                            <HomeBTN/>
                        }
                        {loginDetail.loginDetails &&
                            <Logout/>
                        }
                        {!loginDetail.loginDetails &&
                            <PostAds/>
                        }





                    </Nav>
                </Navbar.Collapse>
            </Col>
        </Navbar>
    );
}

export default MainNavBar; 