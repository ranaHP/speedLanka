import React, {useEffect, useState} from 'react';
import {IFormData} from "../../../types/MainTypes";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducers";
import {IloginDetails} from "../../../store/Interfaces/inteface";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {url} from "../../../api/API";
import PageTitle from "../../admin/pageTitle/PageTitle";
import PostItem from "../../Post/PostItem";
import NoItemFound from "../../NotItemFound/NoItemFound";
import AlertSystem from "../../alertSystem/AlertSystem";
import {alertSystemAction} from "../../../store/actions/AlertSystem";
import {useMutation, useQuery} from "@apollo/client";
import {Get_SELLER_POST} from "../../../api/user/queries";
import {IGetUserPost} from "../../admin/viewPost/ViewPost";
import {GET_ALL_POST, GET_UNVERIFIED_POST} from "../../../api/admin/queries";
import {CHECK_USER_LOGIN_VALIDATIONS} from "../../../api/user/mutations";
import {set} from "react-hook-form";

export interface IGetAllPost{Posts: IFormData[]};
const ViewAllAds: React.FC = () => {
    const [allPostList, setAllPostList] = useState<IFormData [] | null>(null);
    const [approved, setApproved] = useState("not");
    const {data, refetch} = useQuery<IGetAllPost >(GET_ALL_POST );

    useEffect(() => {
        if (!data) return;
        setAllPostList(data.Posts);
    }, [data]);


    const handleOnGivePermission = async () => {
        refetch();
    }

    return (
        <React.Fragment>
            <PageTitle title={"Unapproved Ads"} subTitle={" Ads - " + String(allPostList ? allPostList.length : "0")}/>
            <div className="m-auto  postItems-container p-5">
                {
                    allPostList &&
                    allPostList.map((post: IFormData, index: number) => {
                        return (
                            <PostItem key={index} componentType={"4"}  givePermission={handleOnGivePermission}
                                      postData={post}/>
                        )
                    })
                }
                {!allPostList &&
                    <NoItemFound componentType={"1"}/>
                }
            </div>
        </React.Fragment>
    );
}
export default ViewAllAds;