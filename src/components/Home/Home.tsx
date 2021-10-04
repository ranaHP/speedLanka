import React, {useEffect, useState} from 'react';
import 'react-multi-carousel/lib/styles.css';
import HomeFooter from "./HomeFooter/HomeFooter";
import HomeHeader from "./HomeHeader/HomeHeader";
import HomeHero from "./HomeHero/HomeHero";
import HomeCategory from "./HomeCategory/HomeCategory";
import HomeSearch from "./HomeSearch/HomeSearch";
import HomeLatedAds from "./HomeLatedAds/HomeLatedAds";
import HomeSearchWedding from "./HomeSearchWedding/HomeSearchWedding";
import {useHistory} from "react-router-dom";
export const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


const UserHome : React.FC = ( ) => {
    const history = useHistory();

    const handleOnSearch = (primaryC: string, secondaryC: string,
                            province: string, district: string,
                            city: string, name: string ) => {

        let locationTemp = province.toLowerCase() + '-' + district.toLowerCase() + '-' + city.toLowerCase();
        let categoryTemp = primaryC.toLowerCase() + '-' + secondaryC.toLowerCase();
        let titleTemp = name;

        if(province.toLowerCase() == ""){
            locationTemp = 'all';
        }
        if(primaryC.toLowerCase() ==""){
            categoryTemp = 'all';
        }
        if(name.toLowerCase() ==""){
            titleTemp = 'all';
        }
         history.push("/product/"+locationTemp+"/"+categoryTemp+"/"+titleTemp);
    }

    return (
        <div className="user-home">
            {/*<Image src={BgBanner1} width="100%" />*/}
            <div className="content">

                <HomeHeader/>
                <HomeHero/>
                <HomeSearch onSearch={handleOnSearch}/>
                <HomeCategory/>
                <HomeLatedAds/>
                <HomeSearchWedding/>



                {/*<div className="latest-post-classified ">*/}
                {/*    <div className="title"> Latest Post  </div>*/}
                {/*    <div className="title-sub"> SpeedLanka Classified Portal  </div>*/}
                {/*    <div className="latest-post-card-container ">*/}
                {/*        <Carousel*/}
                {/*            swipeable={true}*/}
                {/*            draggable={true}*/}
                {/*            showDots={true}*/}
                {/*            responsive={responsive}*/}
                {/*            ssr={true} // means to render carousel on server-side.*/}
                {/*            infinite={true}*/}
                {/*            // autoPlay={true}*/}
                {/*            autoPlaySpeed={1000}*/}
                {/*            keyBoardControl={true}*/}
                {/*            customTransition="all 1.5"*/}
                {/*            transitionDuration={500}*/}
                {/*            containerClass="carousel-container"*/}
                {/*            removeArrowOnDeviceType={["tablet", "mobile"]}*/}

                {/*            dotListClass="custom-dot-list-style"*/}
                {/*            itemClass="new-post-card"*/}
                {/*        >*/}
                {/*            <WeddingPostItem/>*/}
                {/*            <WeddingPostItem/>*/}
                {/*            <WeddingPostItem/>*/}
                {/*            <WeddingPostItem/>*/}
                {/*        </Carousel>;*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <HomeFooter/>
        </div>
    )
}
export default UserHome;