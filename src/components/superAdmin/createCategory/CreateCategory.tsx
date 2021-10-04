import React, {FormEvent, useEffect, useState} from 'react';
import {IAttribute, IFormData, IOption} from "../../../types/MainTypes";
import PageTitle from "../../admin/pageTitle/PageTitle";
import PostItem from "../../Post/PostItem";
import NoItemFound from "../../NotItemFound/NoItemFound";
import {useMutation, useQuery} from "@apollo/client";
import {GET_UNVERIFIED_POST} from "../../../api/admin/queries";
import {Accordion, Alert, Button, Col, Form, Row} from "react-bootstrap";
import {Controller, useForm} from "react-hook-form";
import {Electronic} from "../../../config/attributeType";
import Select from "react-select";
import {Trash2} from "react-feather";

const options: IOption[] = [
]

export interface IGetUnverifiedUserPost{getUnVerifiedPosts: IFormData[]};
const CreateCategory: React.FC = () => {
    const {register, handleSubmit, watch, reset ,control, formState: {errors}} = useForm();
    const [attributeList, setAttributeList] = useState<IAttribute [] | null>(null);
    const [attributeName, setAttributeName] = useState<string>("");
    const [attributeError, setAttributeError] = useState<Boolean>(false);
    const [primaryCategoryList, setPrimaryCategoryList] = useState<IOption []>(options);

    const [allPostList, setAllPostList] = useState<IFormData [] | null>(null);
    const [approved, setApproved] = useState("not");
    const {data, refetch} = useQuery<IGetUnverifiedUserPost ,{approved: String}>(GET_UNVERIFIED_POST ,{
        variables: { approved : approved}
    });

    useEffect(() => {
        if (!data) return;
        setAllPostList(data.getUnVerifiedPosts);
    }, [data]);


    const handleOnGivePermission = async () => {
        refetch();
    }

    const onSubmit = async (formData: any) => {
        console.log(formData);
    }
    const handleOnAddAttribute = (name: String) => {
        if (!name) {
            setAttributeError(true);
            return;
        } else {
            if (!attributeList) {
                setAttributeList([{name: name, desc: ""}]);
            } else {
                setAttributeError(false);
                const asttriList: IAttribute [] = attributeList.slice();
                asttriList.push({name: name, desc: ""});
                setAttributeList(asttriList);
            }
            setAttributeName("");
        }
    }
    const handleOnAttributeDelete = ( name: String) =>{
        if(!attributeList) return;
        let attri = attributeList.slice();
        attri = attri.filter( (attribute: IAttribute) => attribute.name != name);
        setAttributeList(attri);
    }
    return (
        <React.Fragment>
            <PageTitle title={"Create Category"} subTitle={""}/>
            <div className="create-category">
                <Col xs={12} sm={12} md={11} lg={11} xl={9} className="m-auto bg-light m-0 p-0 mt-3 ">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Create Category</Accordion.Header>
                            <Accordion.Body>
                                <Row className="m-0 p-0 create-category-form" >
                                    <Col xs={12} sm={12} md={12} lg={11} xl={9} className="m-auto bg-light m-0 p-2 mt-3 d-flex flex-column ">
                                        <Form.Group>
                                            <Form.Label> Category name </Form.Label>
                                            <Form.Control
                                                type="text"
                                                style={{border: attributeError ? "1px soild red" : "0px soild red"}}
                                            />
                                        </Form.Group>
                                        <Form.Group className="my-3 bg-warning">
                                            <Button className="w-100 btn-block "> Create Category</Button>
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Create Sub Category</Accordion.Header>
                            <Accordion.Body>
                                <Row className="m-0 p-0 create-category-form" >
                                    <Col xs={12} sm={12} md={12} lg={11} xl={9} className="m-auto bg-light m-0 p-2 mt-3 d-flex ">
                                        <Form onSubmit={handleSubmit(onSubmit)} className=" m-auto w-100" >
                                            <Row className="m-0 ">
                                                <Col xs={12} sm={12} md={6} lg={6} xl={6} className={"p-2"}>
                                                    <Form.Label> District </Form.Label>
                                                    <Controller
                                                        name="pCategory"
                                                        control={control}
                                                        render={({field}) => <Select
                                                            isClearable
                                                            isSearchable
                                                            {...field}
                                                            options={primaryCategoryList}
                                                        />}
                                                    />
                                                    {watch("locationDType") == null && <Form.Text className="text-danger "> required </Form.Text>}
                                                </Col>
                                            </Row>

                                            <Row className="m-0 ">
                                                <Col xs={12} sm={12} md={6} lg={6} xl={6} className={"p-2"}>
                                                    <Form.Group>
                                                        <Form.Label> Sub-category name </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="m-0 ">
                                                <Col xs={12} sm={12} md={6} lg={6} xl={6} className={"p-2"}>
                                                    {
                                                        attributeList?.map((attribute: IAttribute, index: number) => {
                                                            return (
                                                               <div key={index} className={"d-flex justify-content-between "}>
                                                                   {attribute.name}
                                                                    <div className={"w-auto  cursor-pointer "}>
                                                                        <Trash2 color={"gray"} size={"15"} className={"hover-warning"} onClick={ () => {
                                                                            handleOnAttributeDelete( attribute.name);
                                                                        }} />
                                                                    </div>
                                                               </div>
                                                            )
                                                        })
                                                    }
                                                </Col>
                                            </Row>
                                            <Row className="py-3 m-0">
                                                <Col xs={12} sm={12} md={6} lg={6} xl={6} className={"p-2"}>
                                                    <Form.Group>
                                                        <Form.Label> Property Name </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            style={{border: attributeError ? "1px soild red" : "0px soild red"}}
                                                            onChange={(e) => {
                                                                setAttributeName(e.target.value);
                                                            }}
                                                            value={attributeName}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} sm={12} md={6} lg={6} xl={6} className={"p-2 d-flex "} >
                                                    <Button style={{alignSelf: "flex-end"}} onClick={() => {
                                                        handleOnAddAttribute(attributeName)
                                                    }}>
                                                        Add property
                                                    </Button>

                                                </Col>

                                            </Row>
                                            <Row className="py-1 m-0">

                                                {
                                                    attributeError &&
                                                    <div className="px-3 text-danger">
                                                        property name
                                                        required*
                                                    </div>
                                                }
                                            </Row>
                                            <Form.Group className="my-3">
                                                <Button className="w-100 btn-block "> Create Category</Button>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>


            </div>
            {/*<div className="m-auto  postItems-container p-5">*/}
            {/*    {*/}
            {/*        allPostList &&*/}
            {/*        allPostList.map((post: IFormData, index: number) => {*/}
            {/*            return (*/}
            {/*                post.approved == "not" ?*/}
            {/*                    <PostItem key={index} componentType={"4"}  givePermission={handleOnGivePermission}*/}
            {/*                              postData={post}/> : null*/}
            
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*    {!allPostList &&*/}
            {/*    <NoItemFound componentType={"1"}/>*/}
            {/*    }*/}
            {/*</div>*/}
        </React.Fragment>
    );
}
export default CreateCategory;