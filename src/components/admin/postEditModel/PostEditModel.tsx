import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Modal, Row} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import PostItem from "../../Post/PostItem";
import Form from "react-bootstrap/Form";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import {IAttribute, IFormDataResponse, IOption} from "../../../types/MainTypes";
import {Electronic} from "../../../config/attributeType";
type PostEditModelProps = {
    isShow : boolean
    isHide: () => void
    post: IFormDataResponse
}
const options: IOption[] = [
]
const PostEditModel: React.FC<PostEditModelProps> = ( props ) => {
    const [showEdit, setShowEdit] = useState(false);
    const {register, handleSubmit, watch, reset ,control, formState: {errors}} = useForm();
    const [attributeList, setAttributeList] = useState<IAttribute [] | null>(Electronic);
    const [attributeName, setAttributeName] = useState<string>("");
    const [attributeDesc, setAttributeDesc] = useState<string>("");
    const [attributeError, setAttributeError] = useState<Boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [categoryOptionsList, setCategoryOptionsList] = useState<IOption []>(options);
    const [LocationOptionsList, setLocationOptionsList] = useState<IOption []>(options);

    const onSubmit = async (formData: any) => {
        console.log(formData);
        console.log(attributeList);
    }

    useEffect(() => {
        if(!props.isShow) return;
        setShowEdit(props.isShow);
        setAttributeList(JSON.parse(props.post.attribute));
    }, [props.isShow]);

    const handleOnAddAttribute = (name: String, desc: String) => {
        if (!name || !desc) {
            setAttributeError(true);
            return;
        } else {
            if (!attributeList) {

                setAttributeList([{name: name, desc: desc}]);
            } else {
                setAttributeError(false);
                const asttriList: IAttribute [] = attributeList.slice();
                asttriList.push({name: name, desc: desc});
                setAttributeList(asttriList);
            }
            setAttributeName("");
            setAttributeDesc("");
        }
    }
    const isHide = ( ) => {
        setShowEdit(false);
        props.isHide();
    }
    return (
        <Modal
            show={showEdit}
            backdrop="static"
            keyboard={false}
            onHide={ isHide }
        >
            <Modal.Header closeButton>
                <Modal.Title>Advertisement Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)} className="p-5">
                    <Row>
                        <Form.Group className="mb-3 col-12">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="string" defaultValue={props.post.title} placeholder="" {...register("title", {
                                required: true,
                            })}/>
                            {errors.title  && <Form.Text className="text-danger "> required </Form.Text>}

                        </Form.Group>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-2">
                            <Form.Label> Category </Form.Label>
                            <Controller
                                name="categoryType"

                                control={control}
                                render={({field}) => <Select
                                    isClearable
                                    isSearchable
                                    defaultValue={{value: "ss" , label: "333"}}
                                    {...field}
                                    options={categoryOptionsList}
                                />}
                            />
                            {watch("categoryType") == null && <Form.Text className="text-danger "> required </Form.Text>}
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-2">
                            <Form.Label> Location </Form.Label>
                            <Controller
                                name="locationType"
                                control={control}
                                render={({field}) => <Select
                                    isClearable
                                    isSearchable
                                    {...field}
                                    options={LocationOptionsList}
                                />}
                            />
                            {watch("locationType") == null && <Form.Text className="text-danger "> required </Form.Text>}
                        </Col>


                        <Form.Group className="mb-3 col-12">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" defaultValue={props.post.price}  {...register("price", {
                                required: true,
                            })}
                            />

                            {errors.price && <Form.Text className="text-danger "> required </Form.Text>}

                        </Form.Group>
                        <Form.Group className="mb-3 col-12">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as={"textarea"} defaultValue={props.post.desc} {...register("desc", {
                                required: true,
                            })}/>
                            {errors.desc && <Form.Text className="text-danger "> required </Form.Text>}

                        </Form.Group>
                        <Row className="m-0 p-0">
                            <div className="attribute_container  m-auto">
                                <Row className={"pb-3 border-bottom "}>
                                    {
                                        attributeList?.map((attribute: IAttribute, index: number) => {
                                            return (
                                                <Col xs={12} sm={12} md={6} lg={6} xl={6} key={index} className="m-auto"  >
                                                <Form.Group  >
                                                    <Form.Label> {attribute.name} </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        style={{border: attributeError ? "1px soild red" : "0px soild red"}}
                                                        onChange={(e) => {
                                                            if (attributeList) {
                                                                const attList = attributeList.slice();
                                                                attList[index].desc = e.target.value;
                                                                setAttributeList(attList);

                                                            }
                                                        }}
                                                        required
                                                        value={String(attributeList[index].desc)}
                                                    />
                                                </Form.Group>
                                            </Col>)
                                        })
                                    }
                                </Row>

                                <Row className="py-3">
                                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <Form.Group>
                                            <Form.Label> Attribute Name </Form.Label>
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
                                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <Form.Group>
                                            <Form.Label> Description </Form.Label>
                                            <Form.Control
                                                type="text"
                                                style={{border: attributeError ? "1px soild red" : "0px soild red"}}
                                                onChange={(e) => {
                                                    setAttributeDesc(e.target.value);
                                                }}
                                                value={attributeDesc}
                                            />
                                        </Form.Group>
                                    </Col>
                                    {
                                        attributeError &&
                                        <div className="px-3 pt-3">
                                            <Alert className="alert alert-danger "> Name and Description are
                                                required</Alert>
                                        </div>
                                    }
                                </Row>

                                <Button variant="primary" className="btn btn-primary float-end mb-4" onClick={() => {
                                    handleOnAddAttribute(attributeName, attributeDesc)
                                }}>
                                    Add Attribute
                                </Button>
                            </div>
                        </Row>
                        <Form.Group className="mb-3 col-12">
                            <Form.Label>Seller contact Number</Form.Label>
                            <Form.Control type="number"  defaultValue={props.post.displayNumber} {...register("sContact", {
                                required: true,
                                maxLength: 10,
                                minLength: 10
                            })}/>
                            {errors.sContact && <Form.Text className="text-danger "> required </Form.Text>}

                        </Form.Group>
                        <Form.Group controlId="formFileLg" className="mb-3 m-auto image-upload-container  ">
                            <Form.Label>Product Image Upload</Form.Label>
                            <Form.Control type="file"

                                          {...register("images", {
                                              required: true,
                                          })}/>
                            {errors.images && <Form.Text className="text-danger "> required </Form.Text>}

                        </Form.Group>

                        {
                            errorMessage != "" &&
                            <Alert className="alert alert-danger">
                                {errorMessage}
                            </Alert>
                        }
                        <Button variant="primary" className="btn btn-primary float-end mb-4" type="submit">
                            Save Post
                        </Button>


                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/*<Button variant="secondary" onClick={ isHide }>*/}
                {/*    Close*/}
                {/*</Button>*/}
                {/*<Button variant="primary" >yes agreed</Button>*/}
                speedlanka.com
            </Modal.Footer>
        </Modal>
    )
}
export default PostEditModel;