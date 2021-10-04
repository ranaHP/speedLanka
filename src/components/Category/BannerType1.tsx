import React from 'react'
import {Carousel, Image, Row} from "react-bootstrap";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import banner1 from '../../asset/images/banners/product-banner.jpg';
const BannerType1: React.FC = () => {

    return (
        <Row className={" p-0 pt-4 m-0 category-items-container"}>
            <Carousel>
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src={banner1}
                        alt="First slide"
                    />

                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src={banner1}
                        alt="First slide"
                    />

                </Carousel.Item>
                {/*<Carousel.Item>*/}
                {/*    <img*/}
                {/*        className="d-block w-100"*/}
                {/*        src="https://i.pinimg.com/originals/de/99/ae/de99aed461fe42f35c574bbe489ed853.jpg"*/}
                {/*        alt="Second slide"*/}
                {/*    />*/}


                {/*</Carousel.Item>*/}
                {/*<Carousel.Item>*/}
                {/*    <img*/}
                {/*        className="d-block w-100"*/}
                {/*        src="https://i.pinimg.com/originals/de/99/ae/de99aed461fe42f35c574bbe489ed853.jpg"*/}
                {/*        alt="Third slide"*/}
                {/*    />*/}


                {/*</Carousel.Item>*/}
            </Carousel>
        </Row>
    )
}
export default BannerType1;