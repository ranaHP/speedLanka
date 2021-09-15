import React,{useState, useEffect} from "react";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import {IFormData} from "../../types/MainTypes";

type PostItemProps = {
    componentType: string

}
const NoItemFound: React.FC<PostItemProps> = (props) => {

    return (
        <Col xs={12} sm={12} md={12} lg={11} xl={11} className="m-auto  postItem">
            <Row className="p-5 m-0 text-center text-muted ">
                <h6>  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                /></h6>


                <h6> No Data Item Found</h6>
            </Row>

        </Col>
    );
}

export default NoItemFound;