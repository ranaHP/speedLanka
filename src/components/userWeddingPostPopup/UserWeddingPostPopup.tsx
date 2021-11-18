import React, {useEffect, useState} from 'react';
import {Button, Col, Image, Modal, Row} from "react-bootstrap";
import {IAttribute, ICategory, IFormData, IFormDataResponse, IWeddingResponse} from "../../types/MainTypes";
import {categoryType} from "../../config/postCategory";
import Placeholder from "../../asset/images/placeolder/placeholder1.jpg";
import {DollarSign, FileText, Map, PhoneCall, ShoppingBag, User} from "react-feather";
import VerifiedUser from "../verifiedUser/VerifiedUser";
import Favorit from "../favorit/Favorit";
import Table from "react-bootstrap/Table";
import PostImage from '../../asset/images/postItem/banner1.jpg';


type UserCategorySearchProps = {
    show: boolean
    onHide: () => void
    postData: IWeddingResponse | null
}
const UserWeddingPostPopup: React.FC<UserCategorySearchProps> = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const copyToClipboard = (text: string) => {
        let textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }
    useEffect(() => {
        console.log(props.postData);
    }, []);

    return (
        <div className="user-category-search-model">
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={props.show}
                onHide={props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Wedding Post View
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.postData &&
                        <Row className="p-0 m-0 weddingPostDesc ">
                        {/*<Col xs={12} sm={12} md={12} lg={2} xl={2} className="post-desc-image">*/}
                        {/*    <Image  src={ props.postData.images}*/}
                        {/*            fluid={true} width="100%"  />*/}
                        {/*</Col>*/}
                        <Row className="m-0 p-0 post-desc-image-row">
                            <div className="post-desc-image-container">

                            </div>

                        </Row>
                        <Row className="p-0 m-0" >
                            <Col xs={12} sm={12} md={6} lg={6} xl={6} className="desc mt-3 p-0 m-0 ">
                                <Image  src={ props.postData.image == "" ? PostImage : props.postData.image} fluid={true} height="100%"  />
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6} className="desc  p-0 m-0 ">
                                <ul style={{listStyle: "none"}} className=" p-0 m-0 p-3">
                                    {
                                        props.postData &&
                                        <>
                                            <li className="title" >
                                                Full Name : <b>{props.postData.fname} {props.postData.lname} </b>
                                            </li>

                                            <li className="title" >
                                                Age : <b>{props.postData.age}</b>
                                            </li>

                                            <li className="title" >
                                                Body Type : <b>{props.postData.bodyType}</b>
                                            </li>

                                            <li className="title" >
                                                Description : <b>{props.postData.desc}</b>
                                            </li>

                                            <li className="title" >
                                                Date of Birth : <b>{props.postData.dob}</b>
                                            </li>

                                            <li className="title" >
                                                Education Level : <b>{props.postData.educationLevel}</b>
                                            </li>

                                            <li className="title" >
                                                Email : <b>{props.postData.email}</b>
                                            </li>

                                            <li className="title" >
                                                Gender : <b>{props.postData.gender}</b>
                                            </li>

                                            <li className="title" >
                                                Height : <b>{props.postData.height}cm</b>
                                            </li>

                                            <li className="title" >
                                                Job : <b>{props.postData.job}</b>
                                            </li>

                                            <li className="title" >
                                                Lagnaya : <b>{props.postData.lagnaya}</b>
                                            </li>

                                            <li className="title" >
                                                Language : <b>{props.postData.language}</b>
                                            </li>
                                            <li className="title" >
                                                Address : <b>{props.postData.location}</b>
                                            </li>
                                            <li className="title" >
                                                Marital Status : <b>{props.postData.maritalStatus}</b>
                                            </li>
                                            <li className="title" >
                                                Message : <b>{props.postData.message}</b>
                                            </li>
                                            <li className="title" >
                                                Mobile : <b>{props.postData.mobile}</b>
                                            </li>
                                            <li className="title" >
                                                Nationality : <b>{props.postData.nationality}</b>
                                            </li>
                                            <li className="title" >
                                                Religion : <b>{props.postData.religion}</b>
                                            </li>
                                            <li className="title" >
                                                Posted Date : <b>{props.postData.date}</b>
                                            </li>

                                        </>
                                    }
                                </ul>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="action ">
                                {/*<VerifiedUser approved={"aprooe"}/>*/}
                                {/*<Favorit postData={props.postData} componentType={"2"}/>*/}
                                {/*<Button className="btn btn-success copyContact " onClick={() => {*/}
                                {/*    copyToClipboard(props.postData ? props.postData.displayNumber: "000000000");*/}
                                {/*}}>*/}

                                {/*    Coppy Number*/}
                                {/*</Button>*/}
                            </Col>
                        </Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="desc mt-4">
                            {/*{props.componentType != "3" &&*/}
                            {/*<Table striped bordered hover size="sm">*/}
                            {/*    { JSON.parse(String(props.postData.attribute)).map((attribute:IAttribute, index:number) => {*/}
                            {/*        return (*/}
                            {/*            <tr key={String(String(index) +  attribute.name)} >*/}
                            {/*                <td> {attribute.name}</td>*/}
                            {/*                <td> {attribute.desc === "" ? "temp..." :attribute.desc}</td>*/}
                            {/*            </tr>*/}
                            {/*        )*/}
                            {/*    })}*/}
                            {/*</Table>*/}
                            {/*}*/}
                            <Table striped bordered hover size="sm">
                                {/*{ JSON.parse(String(props.postData.attribute)).map((attribute:IAttribute, index:number) => {*/}
                                {/*    return (*/}
                                {/*        <tr key={String(String(index) +  attribute.name)} >*/}
                                {/*            <td> {attribute.name}</td>*/}
                                {/*            <td> {attribute.desc === "" ? "temp..." :attribute.desc}</td>*/}
                                {/*        </tr>*/}
                                {/*    )*/}
                                {/*})}*/}
                            </Table>
                        </Col>


                    </Row>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
export default UserWeddingPostPopup;