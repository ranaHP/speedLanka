import React, {useEffect, useState} from 'react';
import {IFormData, IFormDataResponse} from "../../../types/MainTypes";
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
import {IGetUserPost, postTypes} from "../../admin/viewPost/ViewPost";
import {GET_ALL_POST, GET_UNVERIFIED_POST} from "../../../api/admin/queries";
import {CHECK_USER_LOGIN_VALIDATIONS} from "../../../api/user/mutations";
import {Controller, set, useForm} from "react-hook-form";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import Select from "react-select";
import PostTableRow from "../../admin/PostTableRow/PostTableRow";
import PostTableRowSuperUser from "../../admin/PostTableRow/PostTableRowSuperUser";

export interface IGetAllPost{Posts: IFormDataResponse[]};
const ViewAllAdsSuperAdmin: React.FC = () => {
    const [allPostList, setAllPostList] = useState<IFormDataResponse [] | null>(null);
    const [filteredPostList, setFilteredPostList] = useState<IFormDataResponse [] | null>(null);
    const [approved, setApproved] = useState("not");
    const {data, refetch } = useQuery<IGetAllPost >(GET_ALL_POST );

    useEffect(() => {
        if (!data) return;
        setAllPostList(data.Posts);
        setFilteredPostList(data.Posts);
        console.log(data.Posts);
    }, [data]);

    const {register, handleSubmit, watch, reset, control, formState: {errors}} = useForm();
    const onSubmit = (formData: any) => {
        if (!allPostList) return;
        setFilteredPostList(allPostList.filter((post: IFormDataResponse) => {
            if (
                post.title.toLowerCase().includes(formData.title.toLowerCase()) &&
                (!formData.statusType ? true : post.approved.toLowerCase().includes(formData.statusType.value.toLowerCase()))
            ) {
                return true;
                console.log("true");
            }
            console.log("false");
            return false;
        }))
    }

    const handleOnGivePermission = async () => {
        refetch();
    }

    return (
        <React.Fragment>
            <PageTitle title={"All Advertisement"} subTitle={" Ads - " + String(allPostList ? allPostList.length : "0")}/>
            <div className="m-auto  postItems-container p-5">
                <div className="m-auto  postItems-search p-2">
                    <Form onSubmit={handleSubmit(onSubmit)} className="p-2 my-3 search-form">
                        <Row className="col-11 m-0 p-0 m-auto ">
                            <div className="form-group">
                                <Form.Label>Reference Number</Form.Label>
                                <Form.Control className="advertisement-name-input" type="string"
                                              placeholder="" {...register("ref", {})}/>
                            </div>
                            <div className="form-group">
                                <Form.Label>Title</Form.Label>
                                <Form.Control className="advertisement-name-input" type="string"
                                              placeholder="" {...register("title", {})}/>
                            </div>
                            <div className="form-group">
                                <Form.Label> Status </Form.Label>
                                <Controller
                                    name="statusType"
                                    control={control}
                                    render={({field}) => <Select
                                        isClearable
                                        isSearchable
                                        {...field}
                                        options={postTypes}
                                    />}
                                />
                            </div>
                            <Button type="submit" className="form-group"> Search</Button>
                        </Row>
                    </Form>
                    <Row className=" m-0 p-0 m-auto ">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className=" m-0 p-0 m-auto ">
                            <Table striped bordered hover responsive >
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tile</th>
                                    <th>Reference NO</th>
                                    <th>Desc</th>
                                    <th>Location</th>
                                    <th>Category</th>
                                    <th>Display</th>
                                    <th>Status</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Pro</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    filteredPostList &&
                                    filteredPostList.map((post: IFormDataResponse, index) => {
                                        return (
                                            // <PostItem key={index} componentType={"1"} postData={post}/>
                                            <PostTableRowSuperUser key={index} post={post} reload={refetch} />
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    {!allPostList &&
                    <NoItemFound componentType={"1"}/>
                    }
                </div>

            </div>
        </React.Fragment>
    );
}
export default ViewAllAdsSuperAdmin;