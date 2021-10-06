import React, { useEffect } from "react";
import './App.scss';
import {Provider} from 'react-redux';
import {store} from './store/reducers/rootReducers';
import Login from "./views/Login";
import Register from "./views/Register";
import DashBoard from "./components/admin/Dashboard";
import SuperAdmin from "./components/superAdmin/SuperAdmin";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import MainView from "./views/mainView";
import Home from "./views/Home";
import UserHome from "./components/Home/Home";
import WeddingSearchHome from "./components/weeding/WeddingSearchHome";


function App() {

    return (
        <Provider store={store}>

            <Router>
                {/*<Link to={"/superadmin"}> Super Admin</Link>*/}
                <Switch>
                    <Route exact path="/">
                        {/*<MainView/>*/}
                        <UserHome/>
                    </Route>
                    <Route path="/product/:loc/:cat/:tit">
                        <MainView/>
                    </Route>
                    <Route path="/wedding">
                        <WeddingSearchHome/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    {/*<PrivateRoute path="/dashboard">*/}
                    {/*    <DashBoard />*/}
                    {/*</PrivateRoute>*/}

                    <Route path="/dashboard" children={<DashBoard/>}/>
                    <Route path="/superadmin">
                        <SuperAdmin/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
}


export default App;
