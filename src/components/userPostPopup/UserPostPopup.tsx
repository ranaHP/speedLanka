import React, {useState} from 'react';
import {Button, Col, Image, Modal, Row} from "react-bootstrap";
import {IAttribute, ICategory, IFormData, IFormDataResponse} from "../../types/MainTypes";
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
    postData: IFormDataResponse | null
}
const UserPostPopup: React.FC<UserCategorySearchProps> = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const copyToClipboard = (text: string) => {
        let textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }
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
                        Post View
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.postData &&
                    <Row className="p-0 m-0 postDesc ">
                        {/*<Col xs={12} sm={12} md={12} lg={2} xl={2} className="post-desc-image">*/}
                        {/*    <Image  src={ props.postData.images}*/}
                        {/*            fluid={true} width="100%"  />*/}
                        {/*</Col>*/}
                        <Row className="m-0 p-0 post-desc-image-row">
                            <div className="post-desc-image-container">
                                <Image  src={ props.postData.images == "" ? PostImage : props.postData.images} fluid={true} height="100%"  />
                            </div>
                            <div className="post-desc-image-container">
                                <Image  src={  props.postData.images == "" ? PostImage : props.postData.images } fluid={true} height="100%"  />
                            </div>
                            <div className="post-desc-image-container">
                                <Image  src={  props.postData.images == "" ? PostImage : props.postData.images } fluid={true} height="100%"  />
                            </div>
                        </Row>
                        <Row className="p-0 m-0" >
                            <Col xs={12} sm={12} md={12} lg={8} xl={8} className="desc mt-3 p-0 m-0 ">
                                <ul style={{listStyle: "none"}} className=" p-0 m-0 p-3">
                                    <li className="title" key={props.postData.title}><b>{props.postData.title === "" ? "temp": props.postData.title}</b></li>
                                    <li className="desc" key={props.postData.title+"2"}><ShoppingBag size={18}
                                                                                                     color="gray"/> {props.postData.cType !="" ? props.postData.cType: "temp..." }
                                    </li>
                                    <li className="location" ><Map size={18} color="gray"/> {props.postData.location}</li>
                                    <li className="price" key={props.postData.price}><DollarSign size={18} color="gray"/> {props.postData.price === "" ? "temp":props.postData.price}</li>
                                    <li className="phone-number" key={props.postData.sellerContact}><PhoneCall size={18} color="gray"/> {props.postData.displayNumber === "" ? "temp..." :props.postData.displayNumber}</li>
                                    <li className="desc" key={props.postData.desc}><FileText size={18} color="gray"/> {props.postData.desc === "" ? "temp..." : props.postData.desc}
                                    </li>
                                    <li className="phone-number"><User size={18}
                                                                       color="gray"/> by {props.postData.sellerName != "" ? props.postData.sellerName : "temp..." }
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="action ">
                                <VerifiedUser approved={"aprooe"}/>
                                <Favorit postData={props.postData} componentType={"2"}/>
                                <Button className="btn btn-success copyContact " onClick={() => {
                                    copyToClipboard(    props.postData ? props.postData.displayNumber: "000000000");
                                }}>

                                    Coppy Number
                                </Button>
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
                                { JSON.parse(String(props.postData.attribute)).map((attribute:IAttribute, index:number) => {
                                    return (
                                        <tr key={String(String(index) +  attribute.name)} >
                                            <td> {attribute.name}</td>
                                            <td> {attribute.desc === "" ? "temp..." :attribute.desc}</td>
                                        </tr>
                                    )
                                })}
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
export default UserPostPopup;
