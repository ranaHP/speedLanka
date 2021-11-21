import React from 'react';
import {Button, Image} from "react-bootstrap";
import PostImage from '../../../asset/images/logo/logo.jpg';
import HeroBanner2 from "../../../asset/images/banners/bannerImage1.svg";
import categoryCard1 from "../../../asset/images/categoryIcon/1.svg";
import HomeItemTitle from "../HomeItemTitle/HomeItemTitle";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
const HomeCategory: React.FC = () => {
    let categoryItems = [
        {
            name: "Electronics",
            ads: 22,
            image: "staticImages/categoryIcon/electric.png"
        },
        {
            name: "Animals",
            ads: 22,
            image: "staticImages/categoryIcon/2.svg"
        },
        {
            name: "Fashion & Beauty",
            ads: 22,
            image: "staticImages/categoryIcon/fashion.png"
        },
        {
            name: "Agriculture",
            ads: 22,
            image: "staticImages/categoryIcon/agri.png"
        },
        {
            name: "Vehicles",
            ads: 22,
            image: "staticImages/categoryIcon/vehicle.png"
        },
        {
            name: "Business & Industry",
            ads: 22,
            image: "staticImages/categoryIcon/1.svg"
        },
        {
            name: "Business",
            ads: 22,
            image: "staticImages/categoryIcon/business.png"
        },
        {
            name: "Mobile",
            ads: 22,
            image: "staticImages/categoryIcon/mobilr.png"
        },
        {
            name: "Property",
            ads: 22,
            image: "staticImages/categoryIcon/property.png"
        },
        {
            name: "Sport",
            ads: 22,
            image: "staticImages/categoryIcon/sports.png"
        }
    ]

    return (
        <>
           <HomeItemTitle  title={"Product Categories"} sub_title={"SpeedLanka.lk"}/>
            <div className="user-home-category-container">
                {
                    categoryItems.map(item => {
                        return <Link to={"/product/all/" + item.name + "/all"} >
                            <div className="category-card">
                                <Image src={item.image} width="50px"/>
                                <div className="card-title">{item.name} <br/> <span
                                    className="card-sub-title"> Ads : {item.ads}</span></div>
                            </div>
                        </Link>
                    })
                }
            </div>
        </>

    )
}
export default HomeCategory;
