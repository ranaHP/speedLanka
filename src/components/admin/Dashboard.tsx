import React, {useEffect, useState} from "react";
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
import {IloginDetails} from "../../store/Interfaces/inteface";
import jwt_decode from "jwt-decode";
import AddWeddingPost from "./addWeddingPost/AddWeddingPost";
import CreatePostHome from "./createPostHome/CreatePostHome";
import ViewPostHome from "./ViewPostHome/ViewPostHome";
import ViewWeddingPost from "./viewWeddingPost/ViewWeddingPost";

const DashBoard: React.FC = () => {
    let {path, url} = useRouteMatch();
    const history = useHistory();
    const [loginDetailsDecodes, setLoginDetailsDecodes] = useState<IloginDetails[] | null>( null);
    const loginDetail: {loginDetails:string}  = useSelector((state: RootState) => state.loginReducer);

    const parseJwt =  (token: string) => {
      try{
          var base64Url = token.split('.')[1];
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return JSON.parse(jsonPayload);
      }catch (e) {
          return  "nodata";
      }
    };
    useEffect(() => {
        if(parseJwt(loginDetail.loginDetails) == "nodata"){
            history.push("/login");
        }else {
            history.push("/dashboard");
        }
    }, [loginDetail]);

    return (

        <Container fluid={true} className="admin-layout">
            <Row className="admin-container m-0 p-0">
                {/*<AlertSystem/>*/}
                <SideNavBar/>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="content-container p-0 m-0">
                    <MainNavBar componentType={"1"}/>
                    <Switch>
                        <Route path={`/dashboard/create-post-home`}>
                            <CreatePostHome/>
                        </Route>
                        <Route path={`/dashboard/view-post-home`}>
                            <ViewPostHome/>
                        </Route>


                        <Route path={`/dashboard/create-add`}>
                            <CreateAdd/>
                        </Route>
                        <Route path={`/dashboard/create-wedding`}>
                            <AddWeddingPost/>
                        </Route>


                        <Route path={`/dashboard/view-post`}>
                            <ViewPost/>
                        </Route>
                        <Route path={`/dashboard/view-wedding`}>
                            <ViewWeddingPost/>
                        </Route>

                        <Route exact path="">
                            {/*<DashBoardHome/>*/}
                            {/*/!*<ViewPost/>*!/                           <CreatePostHome/>*/}

                            <ViewWeddingPost/>

                        </Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
}

export default DashBoard;