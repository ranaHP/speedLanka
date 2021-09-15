import React from "react";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
// @ts-ignore
import logoImage from   '../../asset/images/logo/logo.PNG';
import {Circle, Mail, Map, Phone} from "react-feather";

const Footer: React.FC = () => {
    return (
        <Row className={"p-0 m-0   footer-container"}>
            <Col xs={12} sm={12} md={12} lg={10} xl={10} className=" m-auto">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={3} xl={3} className="col1 my-5">
                        <Image src={logoImage} fluid={true}  className=""/>
                        <div className="item-wrapper">
                            <div className="icon">
                                <Map></Map>
                            </div>
                            <div className="text">
                            SpeedLanka, 123 Complex, <br/> ABC City,Kandy.
                            </div>

                        </div>

                        <div className="item-wrapper">
                            <div className="icon">
                                <Phone/>
                            </div>
                            <div className="text">
                                041-228-3111
                                <br/>
                                041-228-3111
                            </div>
                        </div>

                        <div className="item-wrapper">
                            <div className="icon">
                                <Mail/>
                            </div>
                            <div className="text">
                                info@speddlanka.com
                                <br/>
                                support@speedlanka.com
                            </div>

                        </div>

                    </Col>
                    <Col xs={12} sm={12} md={12} lg={3} xl={3} className="col2">
                        <h1 className="mt-3  title">Feature</h1>
                        <div className="item-wrapper">
                            <div className="icon">
                                <Circle/>
                            </div>
                            <div className="text">
                                SpeedLanka, 123 Complex, <br/> ABC City,Kandy.
                            </div>

                        </div>

                        <div className="item-wrapper">
                            <div className="icon">
                                <Circle/>
                            </div>
                            <div className="text">
                                041-228-3111
                                <br/>
                                041-228-3111
                            </div>
                        </div>

                        <div className="item-wrapper">
                            <div className="icon">
                                <Circle/>
                            </div>
                            <div className="text">
                                info@speddlanka.com
                                <br/>
                                support@speedlanka.com
                            </div>

                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={3} xl={3} className="col2">
                        <h1 className="mt-3  title">Feature</h1>
                        <div className="item-wrapper">
                            <div className="icon">
                                <Circle/>
                            </div>
                            <div className="text">
                                SpeedLanka, 123 Complex, <br/> ABC City,Kandy.
                            </div>

                        </div>

                        <div className="item-wrapper">
                            <div className="icon">
                                <Circle/>
                            </div>
                            <div className="text">
                                041-228-3111
                                <br/>
                                041-228-3111
                            </div>
                        </div>

                        <div className="item-wrapper">
                            <div className="icon">
                                <Circle/>
                            </div>
                            <div className="text">
                                info@speddlanka.com
                                <br/>
                                support@speedlanka.com
                            </div>

                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={3} xl={3} className="col2">
                        <h1 className="mt-3 title">Collaborations</h1>
                        <div className="item-wrapper">
                            <div className="icon">
                                <Circle/>
                            </div>
                            <div className="text">
                                SpeedLanka Job Portal<br/>
                                <a href="#">speedlankajobs.lk</a>
                            </div>

                        </div>

                        <div className="item-wrapper">
                            <div className="icon">
                                <Circle/>
                            </div>
                            <div className="text">
                                SpeedLanka Wedding Portal<br/>
                                <a href="#">speedlankawedding.lk</a>
                            </div>
                        </div>

                        <div className="item-wrapper">
                            <div className="icon">
                                <Circle/>
                            </div>
                            <div className="text">
                                SpeedLanka Classified Portal<br/>
                                <a href="#">speedlankajobs.lk</a>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
export default Footer;