import React from 'react';
import {Button, Image} from "react-bootstrap";
import PostImage from '../../../asset/images/logo/logo.jpg';
import {Link} from "react-router-dom";

const HomeFooter : React.FC = ( ) => {
    return (
        <div className="home-footer-container">
            <div className="home-footer">
               <div className="home-footer-top">
                   <div className="home-footer-image">
                       <Image src={PostImage} width="100%"/>
                   </div>
                   <div className="user-home-footer-navbar">
                       <Link to="/">Home</Link>
                       <Link to="/wedding">Wedding</Link>
                       <Link to="/product">Buy</Link>
                       <Link to="/sell" className="special-nav">Post Ads</Link>
                   </div>
               </div>
                <hr/>
                <div className="home-footer-bottom">
                    © 2021 SPEEDLANKA.LK | All Right Reserved
                </div>
            </div>
        </div>
    )
}
export default HomeFooter;