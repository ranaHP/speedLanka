import React, {useEffect, useState} from 'react';
import {Button, Image} from "react-bootstrap";
import PostImage from '../../../asset/images/logo/logo.jpg';
import HeroBanner2 from "../../../asset/images/banners/bannerImage1.svg";
import categoryCard1 from "../../../asset/images/categoryIcon/1.svg";
import Carousel from "react-multi-carousel";
import HomePostItem from "../HomePostItem/HomePostItem";
import {responsive} from "../Home";
import HomeItemTitle from "../HomeItemTitle/HomeItemTitle";
import {IFormDataResponse} from "../../../types/MainTypes";
import {useQuery} from "@apollo/client";
import {IGetUserSearchPost} from "../../../views/Home";
import {GET_ALL_POST_LIMIT} from "../../../api/user/queries";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducers";
export interface IGetUserPostLimit {
    Postslimit: IFormDataResponse[]
};
const HomeLatedAds: React.FC = () => {

    const [postLimitedList, setPostLimitedList] = useState<IFormDataResponse [] | null>(null);

    const {refetch, loading, error, data} = useQuery<IGetUserPostLimit>(GET_ALL_POST_LIMIT);

    useEffect(() => {
        console.log(data);
        if (!data) return;
        setPostLimitedList(data.Postslimit)
    }, [data]);

    return (
        <>
            <HomeItemTitle title={"Latest Advertisements"} sub_title={"SpeedLanka.lk"}/>

            <div className="latest-post-classified ">
                <div className="latest-post-card-container ">
                    {/*{ postLimitedList &&*/}
                    {/*<Carousel*/}
                    {/*    swipeable={true}*/}
                    {/*    draggable={true}*/}
                    {/*    showDots={true}*/}
                    {/*    responsive={responsive}*/}
                    {/*    ssr={true} // means to render carousel on server-side.*/}
                    {/*    // infinite={true}*/}
                    {/*    // autoPlay={true}*/}
                    {/*    autoPlaySpeed={1000}*/}
                    {/*    keyBoardControl={true}*/}
                    {/*    customTransition="all 1.5"*/}
                    {/*    transitionDuration={500}*/}
                    {/*    containerClass="carousel-container"*/}
                    {/*    removeArrowOnDeviceType={["tablet", "mobile"]}*/}

                    {/*    dotListClass="custom-dot-list-style"*/}
                    {/*    itemClass="new-post-card"*/}
                    {/*>*/}
                    {/*    */}
                    {/*</Carousel>*/}
                    {/*}*/}

                    {
                        postLimitedList &&
                        postLimitedList.map( (post : IFormDataResponse, index:number) => {
                            return  <HomePostItem key={index} postData={post}  />;
                        })
                    }
                </div>
            </div>
        </>


)
}
export default HomeLatedAds;