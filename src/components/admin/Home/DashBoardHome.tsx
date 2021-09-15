import React from "react";
import {Button, Carousel, Container, Row} from "react-bootstrap";
import Banner1 from '../../../asset/images/banners/banner1.jpg';
import {useDispatch} from "react-redux";
import {alertSystemAction} from "../../../store/actions/AlertSystem";

const DashBoardHome: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <Container>
            <Row className={"py-5"}>

                {/*<Carousel>*/}
                {/*    <Carousel.Item>*/}
                {/*        <img*/}
                {/*            className="d-block w-100"*/}
                {/*            src={Banner1}*/}
                {/*            alt="First slide"*/}
                {/*        />*/}
                {/*        <Carousel.Caption>*/}
                {/*            <h3>First slide label</h3>*/}
                {/*            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                {/*        </Carousel.Caption>*/}
                {/*    </Carousel.Item>*/}
                {/*    <Carousel.Item>*/}
                {/*        <img*/}
                {/*            className="d-block w-100"*/}
                {/*            src={Banner1}*/}
                {/*            alt="Second slide"*/}
                {/*        />*/}

                {/*        <Carousel.Caption>*/}
                {/*            <h3>Second slide label</h3>*/}
                {/*            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                {/*        </Carousel.Caption>*/}
                {/*    </Carousel.Item>*/}
                {/*    <Carousel.Item>*/}
                {/*        <img*/}
                {/*            className="d-block w-100"*/}
                {/*            src={Banner1}*/}
                {/*            alt="Third slide"*/}
                {/*        />*/}

                {/*        <Carousel.Caption>*/}
                {/*            <h3>Third slide label</h3>*/}
                {/*            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>*/}
                {/*        </Carousel.Caption>*/}
                {/*    </Carousel.Item>*/}
                {/*</Carousel>*/}
            </Row>
        </Container>
    );
}
export default DashBoardHome;