import React, {useEffect, useState} from 'react';
import {Button, Image} from "react-bootstrap";
import PostImage from '../../../asset/images/logo/logo.jpg';
import HeroBanner2 from "../../../asset/images/banners/bannerImage1.svg";
import categoryCard1 from "../../../asset/images/categoryIcon/1.svg";
import Carousel from "react-multi-carousel";
import HomePostItem from "../HomePostItem/HomePostItem";
import {responsive} from "../Home";
import HomeItemTitle from "../HomeItemTitle/HomeItemTitle";
import {IFormDataResponse, IWeddingResponse} from "../../../types/MainTypes";
import {useQuery} from "@apollo/client";
import {IGetUserSearchPost} from "../../../views/Home";
import {GET_ALL_POST_LIMIT} from "../../../api/user/queries";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducers";
import {GET_ALL_Wedding_POST_LIMIT} from "../../../api/admin/queries";
import WeddingProfileCard from "../../weeding/WeddingProfileCard/WeddingProfileCard";
export interface IGetUserWeddingPostLimit {
    WeddingPostslimit: IWeddingResponse[]
};
const HomeLatestWeddingAds: React.FC = () => {

    const [postLimitedList, setPostLimitedList] = useState<IWeddingResponse [] | null>(null);

    const {refetch, loading, error, data} = useQuery<IGetUserWeddingPostLimit>(GET_ALL_Wedding_POST_LIMIT);

    useEffect(() => {
        if (!data) return;
        setPostLimitedList(data.WeddingPostslimit)
        console.log(data)

    }, [data]);

    useEffect(() => {
        if(!postLimitedList) return;
        console.log("data");
        console.log(postLimitedList);
        console.log("data");
    }, [postLimitedList]);

    return (
        <>
            <HomeItemTitle title={"Latest Wedding Advertisements"} sub_title={"SpeedLanka.lk"}/>
            <div className="latest-post-classified ">
                <div className="latest-post-card-container ">

                    {
                        postLimitedList &&
                        postLimitedList.map( (post : IWeddingResponse, index:number) => {
                            return  <WeddingProfileCard WeddingPost={post}/>;
                        })
                    }
                </div>
            </div>
        </>


)
}
export default HomeLatestWeddingAds;