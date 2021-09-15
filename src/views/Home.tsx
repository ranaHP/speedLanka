import React, {useState, useEffect} from 'react';
import MainNavBar from "../components/mainNavBar/MainNavBar";
import {Col, Container, Pagination, Row} from "react-bootstrap";
import CategoryLocation from "../components/Category/CategoryLocation";
import PostItem from "../components/Post/PostItem";
import CategoryPrice from "../components/Category/CategoryPrice";
import CategoryType from "../components/Category/CategoryType";
import PostSearch from "../components/postSearch/PostSearch";
import BannerType1 from "../components/Category/BannerType1";
import Footer from "../components/footer/Footer";
import {ICategoryOption, IFormData, ILocation} from "../types/MainTypes";
import {url} from "../api/API";
import axios from "axios";
import NoItemFound from "../components/NotItemFound/NoItemFound";

const Home: React.FC = () => {
    const [filteredPostList, setFilteredPostList] = useState<IFormData [] | null>(null);
    const [allPostList, setAllPostList] = useState<IFormData [] | null>(null);
    const [maxPrice, setMaxPrice] = useState<number>(999999999);
    const [maxPriceForComponent, setMaxPriceForComponent] = useState<number>(5000);
    const [filterLocation, setFilterLocation] = useState<ILocation | null>(null);
    const [filterPostType, setFilterPostType] = useState<string | null>(null);
    const [searchItem, setSearchItem] = useState<string>("");
    const [searchResultCount, setSearchResultCount] = useState<number>(0);

    const handleOnGetPost = () => {

    }
    const handleOnMaxPrice = () => {
        if (allPostList) {
            let max: number = 0;
            allPostList.map((post: IFormData) => {
                if (Number(post.price) > max) {
                    max = Number(post.price);
                }
            });
            setMaxPriceForComponent(max);
        }
    }
    useEffect(() => {
        handleOnMaxPrice();
    }, [allPostList]);

    useEffect(() => {
        handleOnGetPost();
    }, []);

    useEffect(() => {
        handleOnFilter();
    }, [filterLocation, maxPrice, filterPostType]);

    useEffect(() => {
        handleOnSearchClick();
    }, [searchItem]);

    const handleOnSearchClick = ( ) => {
        if (!searchItem || !filteredPostList) {
            return;
        }

        const _postData = filteredPostList.slice();
        const _filteredData: IFormData[] = _postData.filter((post: IFormData) =>
            post.title.toLowerCase().includes(searchItem.toLowerCase())
        );
        setFilteredPostList(_filteredData);
        setSearchResultCount(_filteredData.length);
    }
    const handleOnLocationChange = (location: ILocation | null) => {
        // console.log(location)
        setFilterLocation(location);
    }

    const handleOnMaxPriceChange = (maxPrice: number) => {
        setMaxPrice(maxPrice);
    }

    const handleOnProductTypeChange = (category: ICategoryOption | null) => {

    }

    const handleOnSearchItemChange = (searchItem: string) => {
        setSearchItem(searchItem);
    }

    const handleOnFilter = () => {

        // if(!allPostList) return;
        // const _postData = allPostList.slice();
        // const _filteredData: IFormData[] = _postData.filter((post: IFormData) =>
        //     Number(post.price) < maxPrice
        // );
        // setFilteredPostList(_filteredData);


        if (allPostList) {
            if (filterLocation) {
                if (filterLocation.province == "" && filterLocation.distrisct == "" && filterLocation.city == "") {
                    const _postData = allPostList.slice();
                    const _filteredData: IFormData[] = _postData.filter((post: IFormData) =>
                        Number(post.price) < maxPrice
                    );
                    setFilteredPostList(_filteredData);

                } else if (filterLocation.province != "" && filterLocation.distrisct == "" && filterLocation.city == "") {
                    const _postData = allPostList.slice();
                    const _filteredData: IFormData[] = _postData.filter((post: IFormData) =>
                        Number(post.price) < maxPrice &&
                        post.location.toLowerCase() == filterLocation.province.toLowerCase()
                    );
                    setFilteredPostList(_filteredData);

                } else if (filterLocation.province != "" && filterLocation.distrisct != "" && filterLocation.distrisct == "") {
                    const _postData = allPostList.slice();
                    const _filteredData: IFormData[] = _postData.filter((post: IFormData) =>
                        Number(post.price) < maxPrice &&
                        post.location.toLowerCase() == filterLocation.province.toLowerCase() &&
                        post.location.toLowerCase() == filterLocation.distrisct.toLowerCase()
                    );
                    setFilteredPostList(_filteredData);

                } else if (filterLocation.province != "" && filterLocation.distrisct != "" && filterLocation.distrisct != "") {
                    const _postData = allPostList.slice();
                    const _filteredData: IFormData[] = _postData.filter((post: IFormData) =>
                        Number(post.price) < maxPrice &&
                        post.location.toLowerCase() == filterLocation.province.toLowerCase() &&
                        post.location.toLowerCase() == filterLocation.distrisct.toLowerCase() &&
                        post.location.toLowerCase() == filterLocation.city.toLowerCase()
                    );
                    setFilteredPostList(_filteredData);

                }
            } else {
                const _postData = allPostList.slice();
                const _filteredData: IFormData[] = _postData.filter((post: IFormData) =>
                    Number(post.price) < maxPrice
                );
                setFilteredPostList(_filteredData);
            }

        }
    }
    return (
        <Container className="classified-container p-0" fluid={true}>
            <Row className="p-0 m-0">
                <Col xs={12} sm={12} md={12} lg={10} xl={10} className="classified m-auto mt-5 p-0 m-0">
                    <Row className="m-0">
                        <Col xs={12} sm={12} md={3} lg={3} xl={3} className=" ">
                            <CategoryLocation setLocationFilter={handleOnLocationChange} componentType={"2"}/>
                            <CategoryPrice maxPrice={maxPriceForComponent} changeMaxPrice={handleOnMaxPriceChange}/>
                            <CategoryType setCategoryFilter={handleOnProductTypeChange}/>
                            <BannerType1/>
                        </Col>
                        <Col xs={12} sm={12} md={9} lg={9} xl={9} className="p-0 m-0 pt-3">
                            <PostSearch searchChange={handleOnSearchItemChange} searchResultCount={searchResultCount} />
                            {filteredPostList &&
                            filteredPostList.map((post: IFormData, index) => {
                                return <PostItem key={post.title + index} postData={post} componentType={"2"}/>
                            })
                            }
                            {!filteredPostList &&
                                <NoItemFound componentType={"1"}/>
                            }
                            <Pagination></Pagination>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;