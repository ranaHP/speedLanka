import React from 'react';
import {Button, Carousel, Image} from "react-bootstrap";
import PostImage from '../../../asset/images/logo/logo.jpg';
import {MapPin} from "react-feather";
import categoryCard1 from "../../../asset/images/categoryIcon/1.svg";
import HeroBanner2 from "../../../asset/images/banners/bannerImage1.svg";

const HomeHero : React.FC = ( ) => {
    return (
        <>
            <Carousel >
                <Carousel.Item interval={1000}>
                    <div className="user-home-hero-banner">
                        <div className="text-content">
                            <div className="banner-text">
                                <div className="user-home-location">
                                    <MapPin ></MapPin>
                                    <div> Akuressa </div>
                                </div>
                                <div className="user-home-title">
                                    <div>
                                        Sri Lanka's Biggest
                                        <br/>
                                        Online Search
                                    </div>
                                </div>

                                <div className="view-more-btn-container">
                                    <Button className="view-more-btn">
                                        View More
                                    </Button>
                                </div>
                                <div className="slider-dots-container">
                                    <div className="circle"/>
                                    <div className="circle"/>
                                    <div className="circle"/>
                                    <div className="circle"/>
                                </div>
                            </div>


                        </div>
                        <div className="image-content">
                            <Image src={HeroBanner2} width="100%" />
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <div className="user-home-hero-banner">
                        <div className="text-content">
                            <div className="banner-text">
                                <div className="user-home-location">
                                    <MapPin ></MapPin>
                                    <div> Akuressa </div>
                                </div>
                                <div className="user-home-title">
                                    <div>
                                        Find Best Matching
                                        <br/>
                                        Partner
                                    </div>
                                </div>

                                <div className="view-more-btn-container">
                                    <Button className="view-more-btn">
                                        View More
                                    </Button>
                                </div>
                                <div className="slider-dots-container">
                                    <div className="circle"/>
                                    <div className="circle"/>
                                    <div className="circle"/>
                                    <div className="circle"/>
                                </div>
                            </div>


                        </div>
                        <div className="image-content">
                            <Image src={HeroBanner2} width="100%" />
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <div className="user-home-hero-banner">
                        <div className="text-content">
                            <div className="banner-text">
                                <div className="user-home-location">
                                    <MapPin ></MapPin>
                                    <div> Akuressa </div>
                                </div>
                                <div className="user-home-title">
                                    <div>
                                        ගැලපෙන සහකරුවෙකු
                                        <br/>
                                        සොයා ගැනීමට?
                                    </div>
                                </div>

                                <div className="view-more-btn-container">
                                    <Button className="view-more-btn">
                                        View More
                                    </Button>
                                </div>
                                <div className="slider-dots-container">
                                    <div className="circle"/>
                                    <div className="circle"/>
                                    <div className="circle"/>
                                    <div className="circle"/>
                                </div>
                            </div>


                        </div>
                        <div className="image-content">
                            <Image src={HeroBanner2} width="100%" />
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>

        </>
    )
}
export default HomeHero;