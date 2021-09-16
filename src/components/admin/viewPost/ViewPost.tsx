import React, {useEffect, useState} from 'react';
import PageTitle from "../pageTitle/PageTitle";
import {IAttribute, IFormData, IFormDataResponse, IOption} from "../../../types/MainTypes";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducers";
import {IloginDetails} from "../../../store/Interfaces/inteface";
import jwt_decode from "jwt-decode";
import {Button, Col, Form, Image, Modal, Row, Table} from "react-bootstrap";
import NoItemFound from "../../NotItemFound/NoItemFound";
import {useQuery} from "@apollo/client";
import {Get_SELLER_POST} from "../../../api/user/queries";
import {useForm, Controller} from "react-hook-form";
import Select from "react-select";
import PostTableRow from "../PostTableRow/PostTableRow";

export const postTypes: IOption [] = [
    {
        value: "approved", label: "Approved"
    },
    {
        value: "pending", label: "Pending"
    },
    {
        value: "reject", label: "Reject"
    },
    {
        value: "canceled", label: "Canceled"
    },
    {
        value: "expired", label: "Expired"
    }
]

export interface IGetUserPost {
    getPost: IFormDataResponse[]
};
const ViewPost: React.FC = () => {
    const [userMobile, setUserMobile] = useState("04122853111");
    const [allPostList, setAllPostList] = useState<IFormDataResponse [] | null>(null);
    const [filteredPostList, setFilteredPostList] = useState<IFormDataResponse [] | null>(null);
    const loginDetail: { loginDetails: string } = useSelector((state: RootState) => state.loginReducer);
    const [loginDetailsDecodes, setLoginDetailsDecodes] = useState<IloginDetails[] | null>(null);
    const [show, setShow] = useState(false);


    const {refetch, loading, error, data} = useQuery<IGetUserPost, { sellerContact: string }>(Get_SELLER_POST,
        {variables: {sellerContact: userMobile}}
    );

    useEffect(() => {
        if (!loginDetail.loginDetails) return;
        setLoginDetailsDecodes(jwt_decode(String(loginDetail.loginDetails ? loginDetail.loginDetails : "")));
    }, [loginDetail]);

    useEffect(() => {
        if (!loginDetailsDecodes) return;
        setUserMobile(loginDetailsDecodes[0].contact);
        refetch();
    }, [loginDetailsDecodes]);

    useEffect(() => {
        refetch();
    }, [userMobile]);


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
        if (!data) return;
        setAllPostList(data.getPost);
        setFilteredPostList(data.getPost);
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


    return (
        <React.Fragment>
            <PageTitle title={"My Advertisement "} subTitle={"Ads - " + String(allPostList ? allPostList.length : "")}/>
            <div className="m-auto  postItems-search p-2">
                <Form onSubmit={handleSubmit(onSubmit)} className="p-2 my-3 search-form">
                    <Row className="col-11 m-0 p-0 m-auto ">
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
                    <Col xs={12} sm={12} md={12} lg={11} xl={11} className=" m-0 p-0 m-auto ">
                        <Table striped bordered hover responsive>
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
                                            <PostTableRow key={index} post={post} reload={refetch}/>
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
        </React.Fragment>
    );
};

export default ViewPost;