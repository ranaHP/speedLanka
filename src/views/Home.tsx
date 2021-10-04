import React, {useState, useEffect} from 'react';
import {Button, Col, Container, Pagination, Row, Spinner} from "react-bootstrap";
import BannerType1 from "../components/Category/BannerType1";
import {ICategoryOption, IFormData, IFormDataResponse, ILocation} from "../types/MainTypes";
import NoItemFound from "../components/NotItemFound/NoItemFound";
import HomeSearch from "../components/Home/HomeSearch/HomeSearch";
import AdsPostItem from "../components/Home/AdsPostItem/AdsPostItem";
import {useQuery} from "@apollo/client";
import {Get_Search_POST, Get_SELLER_POST} from "../api/user/queries";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
export interface IGetUserSearchPost {
    getUnVerifiedPosts: IFormDataResponse[]
};


export interface searchUrlParameter {loc: string, cat: string, tit: string}
const Home: React.FC = () => {
    const [filteredPostList, setFilteredPostList] = useState<IFormDataResponse [] | null>(null);
    const [allPostList, setAllPostList] = useState<IFormDataResponse [] | null>(null);
    const [searchResultCount, setSearchResultCount] = useState<number>(0);
    const [location, setLocation] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    let urlParameters  = useParams<searchUrlParameter>();

    useEffect(() => {
        if(urlParameters.loc == 'all'){

        }else{
            let locaTemp = urlParameters.loc.replaceAll("-" , "/");
            setLocation(locaTemp);
        }
        if(urlParameters.cat == 'all'){

        }else{
            let catTemp = urlParameters.cat.replaceAll("-" , "/");
            setCategory(catTemp);
        }
        if(urlParameters.tit == 'all'){

        }else{
            setTitle(urlParameters.tit);
        }
    }, [urlParameters]);
    const {refetch, loading, error, data} = useQuery<IGetUserSearchPost, {
        approved: string,
        location: string,
        category: string,
        name: string
    }>(Get_Search_POST,
        {
            variables: {
                approved: "approved",
                location:   location,
                category: category,
                name: title
            }
        }
    );

    useEffect(() => {

        if (!data) return;
        setAllPostList(data.getUnVerifiedPosts)
    }, [data]);

    useEffect(() => {
        setFilteredPostList(allPostList)
    }, [allPostList]);

    const handleOnSearch = (primaryC: string, secondaryC: string,
                            province: string, district: string,
                            city: string, name: string ) => {

        setLocation(province.toLowerCase() + '/' + district.toLowerCase() + '/' + city.toLowerCase())
        setCategory(primaryC.toLowerCase() + '/' + secondaryC.toLowerCase());
        setTitle(name);
        if(province.toLowerCase() == ""){
            setLocation("");
        }
        if(primaryC.toLowerCase() ==""){
            setCategory("")
        }


    }
    useEffect(() => {
        refetch();
    }, [ title]);





    return (
        <Container className="classified-container p-0 pt-2" fluid={true}>
            <Row className="p-0 m-0">
                <BannerType1/>
                {/*<h3>ID: {temp}</h3>*/}
                <Col xs={12} sm={12} md={12} lg={10} xl={10} className="classified m-auto mt-5 p-0 m-0">
                    <Row className="m-0">
                        {/*<Col xs={12} sm={12} md={3} lg={3} xl={3} className=" ">*/}
                        {/*    /!*<CategoryLocation setLocationFilter={handleOnLocationChange} componentType={"2"}/>*!/*/}
                        {/*    /!*<CategoryPrice maxPrice={maxPriceForComponent} changeMaxPrice={handleOnMaxPriceChange}/>*!/*/}
                        {/*    /!*<CategoryType setCategoryFilter={handleOnProductTypeChange}/>*!/*/}
                        {/*    /!*<BannerType1/>*!/*/}
                        {/*</Col>*/}

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="p-0 m-0 pt-3 m-auto ">
                            <HomeSearch onSearch={handleOnSearch}/>

                            <Row className="m-0 p-0 ads-post-container">
                                {filteredPostList &&
                                filteredPostList.map((post: IFormDataResponse, index) => {
                                    return <AdsPostItem key={index} postData={post}/>
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
                                {!filteredPostList &&
                                    <NoItemFound componentType={"1"}/>
                                }
                            </Row>
                            <Pagination></Pagination>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;