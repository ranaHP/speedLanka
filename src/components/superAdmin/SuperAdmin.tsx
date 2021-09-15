import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import AlertSystem from "../alertSystem/AlertSystem";
import SideNavBar from "../admin/sideNavBar/SIdeNavBar";
import MainNavBar from "../mainNavBar/MainNavBar";
import {Route, Switch} from "react-router-dom";
import CreateAdd from "../admin/addProducts/CreateAdd";
import ViewPost from "../admin/viewPost/ViewPost";
import DashBoardHome from "../admin/Home/DashBoardHome";
import ViewAllAds from "./viewAllAds/ViewAllAds";
import ViewUnApprovedAds from "./viewUnApporovedAds/ViewAllAds";

const SuperAdmin: React.FC =  ( ) => {
    return (
        <Container fluid={true} className="admin-layout">
            <Row className="admin-container">
                <SideNavBar/>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="content-container p-0">
                    <MainNavBar componentType={"1"}/>
                    <Switch>
                        <Route path={`/superadmin/all-ads`}>
                            <ViewAllAds/>
                        </Route>
                        <Route path={`/superadmin/ads-for-approved`}>
                            {/*<ViewPost/>*/}
                            <ViewUnApprovedAds/>

                        </Route>
                        <Route exact path={""}>
                            {/*<DashBoardHome/>*/}
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
} ;

export default SuperAdmin;