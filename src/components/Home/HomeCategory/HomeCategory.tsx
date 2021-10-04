import React from 'react';
import {Button, Image} from "react-bootstrap";
import PostImage from '../../../asset/images/logo/logo.jpg';
import HeroBanner2 from "../../../asset/images/banners/bannerImage1.svg";
import categoryCard1 from "../../../asset/images/categoryIcon/1.svg";
import HomeItemTitle from "../HomeItemTitle/HomeItemTitle";

const HomeCategory: React.FC = () => {
    let categoryItems = [
        {
            name: "Electronics",
            ads: 22,
            image: "../../asset/images/categoryIcon/1.svg"
        },
        {
            name: "Animals",
            ads: 22,
            image: "../../asset/images/categoryIcon/1.svg"
        },
        {
            name: "Fashion & Beauty",
            ads: 22,
            image: "../../asset/images/categoryIcon/1.svg"
        },
        {
            name: "Agriculture",
            ads: 22,
            image: "../../asset/images/categoryIcon/1.svg"
        },
        {
            name: "Vehicles",
            ads: 22,
            image: "../../asset/images/categoryIcon/1.svg"
        },
        {
            name: "Business & Industry",
            ads: 22,
            image: "../../asset/images/categoryIcon/1.svg"
        },
        {
            name: "Jobs",
            ads: 22,
            image: "../../asset/images/categoryIcon/1.svg"
        },
        {
            name: "Agriculture",
            ads: 22,
            image: "../../asset/images/categoryIcon/1.svg"
        },
        {
            name: "Vehicles",
            ads: 22,
            image: "../../asset/images/categoryIcon/1.svg"
        },
        {
            name: "Business & Industry",
            ads: 22,
            image: "../../asset/images/categoryIcon/1.svg"
        },
        {
            name: "Jobs",
            ads: 22,
            image: "../../asset/images/categoryIcon/1.svg"
        }
    ]

    return (
        <>
           <HomeItemTitle  title={"Product Categories"} sub_title={"SpeedLanka.lk"}/>
            <div className="user-home-category-container">
                {
                    categoryItems.map(item => {
                        return <div className="category-card">
                            <Image src={categoryCard1} width="50px"/>
                            <div className="card-title">{item.name} <br/> <span
                                className="card-sub-title"> Ads : {item.ads}</span></div>
                        </div>
                    })
                }
            </div>
        </>

    )
}
export default HomeCategory;