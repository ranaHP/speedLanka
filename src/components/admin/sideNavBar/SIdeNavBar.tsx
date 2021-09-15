import React, {useEffect, useState} from 'react';
import {Button, Col, Nav, Row} from "react-bootstrap";
import {
    AlertTriangle,
    CheckSquare,
    Edit,
    Menu,
    PlusCircle,
    ShoppingBag,
    ShoppingCart,
    Trello,
} from "react-feather";
import ProfileDetails from "../profileDetails/ProfileDetails";
import {INavItem} from "../../../types/MainTypes";
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducers";
import {IloginDetails} from "../../../store/Interfaces/inteface";
import jwt_decode from "jwt-decode";

const tempNavItems: INavItem [] = [
    {
        title: 'Home',
        route: 'dashboard',
        icon: 'trello',
        subNav: [
            {
                icon: 'trello',
                title: 'Dashboard',
                route: 'dashboard',
                subNav: null
            }
        ]
    },

];
const navItems: INavItem [] = [
    // {
    //     title: 'Home',
    //     route: 'dashboard',
    //     icon : 'trello',
    //     subNav: [
    //         {
    //             icon : 'trello',
    //             title: 'Dashboard',
    //             route: 'dashboard',
    //             subNav: null
    //         }
    //     ]
    // },
    {
        title: 'My Adds',
        route: 'dashboard/',
        icon: 'shopping-bag',
        subNav: [
            {
                icon: 'menu',
                title: 'Create Adds',
                route: 'dashboard/view-add',
                subNav: null
            },
            {
                icon: 'plus-circle',
                title: 'View Adds',
                route: 'dashboard/create-add',
                subNav: null
            }
        ]
    }
];
const navItemsSuperAdmin: INavItem [] = [
    {
        title: 'Home',
        route: 'superadmin',
        icon: 'trello',
        subNav: [
            {
                icon: 'trello',
                title: 'Dashboard',
                route: 'superadmin/all-ads',
                subNav: null
            }
        ]
    },
    {
        title: 'My Adds',
        route: 'superadmin/view-product',
        icon: 'shopping-bag',
        subNav: [
            {
                icon: 'menu',
                title: 'Create Adds',
                route: 'superadmin/ads-for-approved',
                subNav: null
            },
            {
                icon: 'plus-circle',
                title: 'View Adds',
                route: 'superadmin/create-add',
                subNav: null
            }
        ]
    }
];

const SideNavBar: React.FC = () => {
    const [ShowSideBar, setShowSideBar] = useState<boolean | null>(false);
    const handleOnReturnIcon = (icon: string) => {
        switch (icon) {
            case 'trello':
                return <Trello/>;
            case 'edit':
                return <Edit size={17}/>
            case 'menu':
                return <Menu size={17}/>
            case 'check-square':
                return <CheckSquare size={17}/>
            case 'shopping-cart':
                return <ShoppingCart/>
            case 'alert-triangle':
                return <AlertTriangle size={17}/>
            case 'plus-circle':
                return <PlusCircle size={17}/>
            case 'shopping-bag':
                return <ShoppingBag/>
            default:
                return <ShoppingCart/>
        }
    }
    const history = useHistory();
    const loginDetail: { loginDetails: string } = useSelector((state: RootState) => state.loginReducer);
    const [navList, setNavList] = useState<INavItem [] | null>(navItems);
    const [loginDetailsDecodes, setLoginDetailsDecodes] = useState<IloginDetails[] | null>(null);
    useEffect(() => {
        try {
            setLoginDetailsDecodes(jwt_decode(String(loginDetail.loginDetails ? loginDetail.loginDetails : "")));
        } catch (e) {
            history.push("/");
        }
    }, [loginDetail]);

    useEffect(() => {
        if (!loginDetailsDecodes) return;
        if (loginDetailsDecodes[0].roll == "seller") {
            setNavList(navItems);
        } else if (loginDetailsDecodes[0].roll == "Admin") {
            setNavList(navItemsSuperAdmin);
        }
    }, [loginDetailsDecodes]);

    return (
        <React.Fragment>

            <Col className="side-navbar">
                <Row onClick={() => {
                    setShowSideBar(!ShowSideBar)
                }}>
                    <Col xs={12} className="p-0 m-0">
                        <ProfileDetails/>
                        <Nav defaultActiveKey="/dashboard" className="flex-column">
                            {navList &&
                            navList.map((navitem: INavItem) => {
                                return (
                                    <Nav.Item key={navitem.title}>
                                        <div className="nav-link">
                                            {/*{handleOnReturnIcon(navitem.icon)}*/}
                                            {/*&nbsp;*/}
                                            {/*&nbsp;*/}
                                            {/*{navitem.title}*/}
                                            {
                                                navitem.subNav &&
                                                navitem.subNav.map((subNav: INavItem) => {
                                                    return (
                                                        <Link to={`/${subNav.route}`} key={subNav.route}>
                                                            <div className="nav-icon">

                                                                <div className="nav-link">

                                                                    {handleOnReturnIcon(subNav.icon)}

                                                                    {/*{subNav.title}*/}
                                                                </div>

                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Nav.Item>
                                )
                            })

                            }

                        </Nav>

                    </Col>
                </Row>
            </Col>
        </React.Fragment>
    );
}

export default SideNavBar;