import React from 'react';
import {Button, Image} from "react-bootstrap";
import PostImage from '../../../asset/images/logo/logo.jpg';
import HeroBanner2 from "../../../asset/images/banners/bannerImage1.svg";
import categoryCard1 from "../../../asset/images/categoryIcon/1.svg";

type HomeItemTitleProps = {
    title: String
    sub_title: String
}
const HomeItemTitle: React.FC<HomeItemTitleProps> = ( props ) => {

    return (
        <div className="home-title">
            <div className="title"> {props.title}  </div>
            <div className="title-sub"> {props.sub_title}  </div>
        </div>
    )
}
export default HomeItemTitle;