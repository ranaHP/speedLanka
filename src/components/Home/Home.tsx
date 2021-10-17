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
import WeddingSearch from "../weeding/WeddingSearch/WeddingSearch";
import HomeLatestWeddingAds from "./HomeLatedWeddingAds/HomeLatestWeddingAds";
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
    const handleOnWeddingSearch = (looking :string, ageStart: number , ageTo: number  , religion:string , motherTongue:string , job:string) => {
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
                <WeddingSearch onSearch={handleOnWeddingSearch}/>
                <HomeLatestWeddingAds/>
            </div>
            <HomeFooter/>
        </div>
    )
}
export default UserHome;