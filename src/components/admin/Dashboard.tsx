import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import SideNavBar from "../../components/admin/sideNavBar/SIdeNavBar";
import CreateAdd from "./addProducts/CreateAdd";
import ViewPost from "./viewPost/ViewPost";
import UpdateProducts from "./updateProducts/UpdateProducts";
import MainNavBar from "../mainNavBar/MainNavBar";
import DashBoardHome from "./Home/DashBoardHome";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch, useHistory
} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducers";
import AlertSystem from "../alertSystem/AlertSystem";

const DashBoard: React.FC = () => {
    let {path, url} = useRouteMatch();
    const history = useHistory();

    const loginDetail: { loginDetails: string } = useSelector((state: RootState) => state.loginReducer);
    if (loginDetail.loginDetails == "") {
        history.replace("/login");
    }


    return (

        <Container fluid={true} className="admin-layout">
            <Row className="admin-container">
                <AlertSystem/>
                <SideNavBar/>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="content-container p-0">
                    <MainNavBar componentType={"1"}/>
                    <Switch>
                        <Route path={`${path}/create-add`}>
                            <CreateAdd/>
                        </Route>
                        <Route path={`${path}/view-add`}>
                            <ViewPost/>
                        </Route>
                        <Route exact path={path}>
                            {/*<DashBoardHome/>*/}
                            <ViewPost/>
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
}

export default DashBoard;