import React from 'react';
import PageTitle from "../pageTitle/PageTitle";
import {Button, Card, Image, Row} from "react-bootstrap";
import HeroBanner2 from "../../../asset/images/banners/bannerImage1.svg";
import {Link, useHistory, useRouteMatch} from "react-router-dom";

const CreatePostHome : React.FC = ( ) => {
    let {path, url} = useRouteMatch();
    return (
        <>
            <PageTitle title={"Create Post"} subTitle={" "}/>
            <div className={"create-post-home-container"}>
                {/*<div className="text-center">*/}
                {/*     <h3> Select one... </h3>*/}
                {/*    <span className="sub-title"> SpeedLanka.lk </span>*/}
                {/*</div>*/}
                <div className={"create-post-home"}>
                    <Card className="text-center">
                        <Card.Header>Wedding</Card.Header>
                        <Card.Body>
                            <Image src={HeroBanner2} width="100%" />
                            <Card.Title>Special title treatment</Card.Title>
                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                            <Link to={`/dashboard/create-add`} >
                                <Button variant="primary" >Create Wedding Post</Button>
                            </Link>
                        </Card.Body>
                        <Card.Footer className="text-muted">Speedlanka.lk</Card.Footer>
                    </Card>
                    <Card className="text-center">
                        <Card.Header>Sell Item</Card.Header>
                        <Card.Body>
                            <Image src={HeroBanner2} width="100%" />
                            <Card.Title>Special title treatment</Card.Title>
                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                            <Link to={`/dashboard/create-wedding`} >
                                <Button variant="primary">Create Sell Item</Button>
                            </Link>
                        </Card.Body>
                        <Card.Footer className="text-muted">Speedlanka.lk</Card.Footer>
                    </Card>
                    {/*<Card style={{ width: '18rem' }}>*/}
                    {/*    <Card.Img variant="top" src="holder.js/100px180" />*/}
                    {/*    <Card.Body>*/}
                    {/*        <Card.Title>Card Title</Card.Title>*/}
                    {/*        <Card.Text>*/}
                    {/*            Some quick example text to build on the card title and make up the bulk of*/}
                    {/*            the card's content.*/}
                    {/*        </Card.Text>*/}
                    {/*        <Button variant="primary">Go somewhere</Button>*/}
                    {/*    </Card.Body>*/}
                    {/*</Card>*/}
                    {/*<Card style={{ width: '18rem' }}>*/}
                    {/*    <Card.Img variant="top" src="holder.js/100px180" />*/}
                    {/*    <Card.Body>*/}
                    {/*        <Card.Title>Card Title</Card.Title>*/}
                    {/*        <Card.Text>*/}
                    {/*            Some quick example text to build on the card title and make up the bulk of*/}
                    {/*            the card's content.*/}
                    {/*        </Card.Text>*/}
                    {/*        <Button variant="primary">Go somewhere</Button>*/}
                    {/*    </Card.Body>*/}
                    {/*</Card>*/}
                </div>
            </div>
        </>
    )
}
export default CreatePostHome;