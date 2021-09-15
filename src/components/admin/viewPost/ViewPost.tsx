import React, {useEffect, useState} from 'react';
import PageTitle from "../pageTitle/PageTitle";
import PostItem from "../../Post/PostItem";
import axios from "axios";
import {url} from "../../../api/API";
import {IFormData, IProduct} from "../../../types/MainTypes";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducers";
import {IloginDetails} from "../../../store/Interfaces/inteface";
import jwt_decode from "jwt-decode";
import {Button} from "react-bootstrap";
import NoItemFound from "../../NotItemFound/NoItemFound";
import {useQuery} from "@apollo/client";
import {Get_SELLER_POST} from "../../../api/user/queries";
import {serialize} from "v8";

export interface IGetUserPost{getPost: IFormData[]};
const ViewPost: React.FC = () => {
    const [userMobile, setUserMobile] = useState("0717355284");
    const [allPostList, setAllPostList] = useState<IFormData [] | null>(null);
    const loginDetail: {loginDetails:string} = useSelector((state: RootState) => state.loginReducer);
    const [loginDetailsDecodes, setLoginDetailsDecodes] = useState<IloginDetails[] | null>( null);
    const { refetch, loading, error, data } = useQuery<IGetUserPost, {sellerContact: string}>(Get_SELLER_POST,
        {variables : {sellerContact : userMobile}}
    );

    useEffect(() => {
        setLoginDetailsDecodes(jwt_decode(String(loginDetail.loginDetails ? loginDetail.loginDetails : "")));
        // setLoginDetailsDecodes(jwt_decode(loginDetail.loginDetails));
    }, [loginDetail]);

    useEffect(() => {
        if(!loginDetailsDecodes) return;
        setUserMobile(loginDetailsDecodes[0].contact);
    }, [loginDetailsDecodes]);
    useEffect(() => {
        setUserMobile("0717355284");
        refetch();
    }, []);


    const handleOnGetPost = () => {
        // const loginDetailsDecode:IloginDetails = jwt_decode(loginDetail.loginDetails);
        // axios.post(url + "/post/" + loginDetailsDecode.contact).then(res => {
        //     setAllPostList(res.data);
        // });
    }
    useEffect(() => {
        handleOnGetPost();
    }, [loginDetail]);

    useEffect(() => {
       if(!data) return;
       setAllPostList(data.getPost);
        // console.log(data);
        // console.log(data.getPost);
    }, [data]);

    return (
        <React.Fragment>
            <PageTitle title={"My Posts "} subTitle={"48 ads"} />
            <div className="m-auto  postItems-container p-5">

                {
                    allPostList &&
                        allPostList.map( (post:IFormData, index) => {
                            return (
                                <PostItem key={index} componentType={"1"} postData={post}/>
                                // <h1 key={index}>{post.title}</h1>
                            )
                        })
                }
                {!allPostList &&
                <NoItemFound componentType={"1"}/>
                }
            </div>
        </React.Fragment>
    );
};

export default ViewPost;