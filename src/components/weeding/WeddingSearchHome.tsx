import React, {useEffect, useState} from 'react';
import HomeHeader from "../Home/HomeHeader/HomeHeader";
import HomeFooter from "../Home/HomeFooter/HomeFooter";
import BannerType1 from "../Category/BannerType1";
import {Col, Pagination, Row, Spinner} from "react-bootstrap";
import {IFormDataResponse, IWeddingResponse} from "../../types/MainTypes";
import NoItemFound from "../NotItemFound/NoItemFound";
import WeddingSearch from "./WeddingSearch/WeddingSearch";
import WeddingProfileCard from "./WeddingProfileCard/WeddingProfileCard";
import {GET_SEARCH_Wedding_POST} from "../../api/admin/queries";
import {useQuery} from "@apollo/client";

export interface IGetUserSearchWeddingPost {
    getWeddingPostsSearch: IWeddingResponse[]
};
const WeddingSearchHome : React.FC = ( ) => {
    const [filteredPostList, setFilteredPostList] = useState<IWeddingResponse [] | null>(null);
    const [allPostList, setAllPostList] = useState<IWeddingResponse [] | null>(null);
    const [looking, setLooking] = useState<string>("");
    const [ageStart, setAgeStart] = useState<number>(18);
    const [ageTo, setAgeTo] = useState<number>(75);
    const [religion, setReligion] = useState<string>("");
    const [motherTongue, setMotherTongue] = useState<string>("");
    const [job, setJob] = useState<string>("");

    const {refetch, loading, error, data} = useQuery<IGetUserSearchWeddingPost, {
        gender : string,
        ageFrom : number,
        ageTo : number,
        religion :  string,
        language : string,
        job :  string,
    }>(GET_SEARCH_Wedding_POST,
        {
            variables: {
                gender : looking,
                ageFrom : ageStart,
                ageTo : ageTo,
                religion : religion,
                language : motherTongue,
                job : job,
            }
        }
    );

    useEffect(() => {

        if (!data) return;
        setAllPostList(data.getWeddingPostsSearch)
    }, [data]);

    useEffect(() => {
        setFilteredPostList(allPostList);
        console.log(allPostList);
    }, [allPostList]);

    const handleOnSearch = (looking :string, ageStart: number , ageTo: number  , religion:string , motherTongue:string , job:string) => {
        setLooking(looking);
        setJob(job);
        setReligion(religion);
        setAgeTo(ageTo)
        setAgeStart(ageStart)
        setMotherTongue(motherTongue);
        if(ageStart == 0){
            setAgeStart(18);
        }
        if(ageTo == 0){
            setAgeTo(75);
        }
        refetch();
    }
    return (
        <>
            <div className="search-wedding-home">
                <HomeHeader/>
                <BannerType1/>
                <Col xs={12} sm={12} md={12} lg={10} xl={10} className="classified m-auto mt-5 p-0 m-0">
                    <Row className="m-0">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0 m-0 pt-3 m-auto ">
                            <WeddingSearch onSearch={handleOnSearch}  />
                            <Row className="m-0 p-0 ads-post-container">


                                <Row className="wedding-profile-container text-center">

                                    {filteredPostList &&
                                    filteredPostList.map((post: IWeddingResponse, index) => {
                                        return  <WeddingProfileCard WeddingPost={post}/>

                                    })
                                    }
                                    {
                                            loading &&   <h6>  <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /></h6>

                                    }
                                    {filteredPostList == [] &&
                                    <NoItemFound componentType={"1"}/>
                                    }
                                </Row>

                            </Row>
                            <Pagination></Pagination>
                        </Col>
                    </Row>
                </Col>
                <HomeFooter/>
            </div>
        </>
    )
}

export  default  WeddingSearchHome;