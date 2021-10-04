import React from "react";
import {Button, Col, Image, Modal, Row} from "react-bootstrap";
import {IAttribute, IFormData} from "../../types/MainTypes";
import {DollarSign, FileText, Map, PhoneCall, Shield, ShieldOff, ShoppingBag, Star, User} from "react-feather";
import Table from 'react-bootstrap/Table'
import Favorit from "../favorit/Favorit";
import VerifiedUser from "../verifiedUser/VerifiedUser";
import Placeholder from "../../asset/images/placeolder/placeholder1.jpg";
import {addFavPostItem} from "../../store/actions/CheckoutActions";
import {useDispatch, useSelector} from "react-redux";
import jwt_decode from "jwt-decode";

type PostDescProps = {
    onHide: () => void
    show: boolean
    postData?: IFormData | null
    componentType?:String
}

const postData: IFormData = {
    cType: "Electronic",
    location: "Kandy",
    title: "Samsung Galaxy Note 8 (Used)",
    price: "2500",
    desc: "Hansana Ranweera",
    attribute: [
        {name: "Color", desc: "red"},
        {name: "model", desc: "tre"},
        {name: "mileage", desc: "1500"},
        {name: "year", desc: "2019"}
    ],
    sellerName: "Hansana Ranweera",
    sellerContact: "0412283111",
    images: "https://www.seekpng.com/png/small/147-1478608_carrot-twenty-seven-png-carret-hd.png",
    approved: "approved",
    date: "2019-03-10",
    sellerVerified: "",
    displayNumber: "",
    _id:""
}
const PostDesc: React.FC<PostDescProps> = (props) => {
    const dispatch = useDispatch();
    const copyToClipboard = (text: string) => {
        let textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                {props.postData &&
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.postData.title === "" ? "temp": props.postData.title}
                </Modal.Title>
                }
            </Modal.Header>
            <Modal.Body>
                {props.postData &&
                <Row className="p-0 m-0 postDesc ">
                    <Col xs={12} sm={12} md={3} lg={2} xl={2} className="image">
                        <Image  src={props.postData.images === "" ? Placeholder:props.postData.images}
                               fluid={true}/>
                    </Col>
                    <Col xs={12} sm={12} md={5} lg={7} xl={7} className="desc mt-3">
                            <ul style={{listStyle: "none"}}>
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
                    <Col xs={12} sm={12} md={4} lg={3} xl={3} className="action ">
                        <VerifiedUser approved={"aprooe"}/>
                        {/*<Favorit postData={props.postData} componentType={"2"}/>*/}
                        <Button className="btn btn-success copyContact " onClick={() => {
                            copyToClipboard(postData.sellerContact);
                        }}>
                            Coppy Number
                        </Button>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="desc mt-4">
                        {props.componentType != "3" &&
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
                        }
                        {props.componentType == "3" &&
                        <Table striped bordered hover size="sm">
                            { props.postData.attribute.map((attribute:IAttribute, index:number) => {
                                return (
                                    <tr key={String(String(index) +  attribute.name)} >
                                        <td> {attribute.name}</td>
                                        <td> {attribute.desc === "" ? "temp..." :attribute.desc}</td>
                                    </tr>
                                )
                            })}
                        </Table>
                        }
                    </Col>


                </Row>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default PostDesc;