import React, {useEffect, useState} from 'react';
import {Col} from "react-bootstrap";
import {
    useRouteMatch,
} from "react-router-dom";
import {IloginDetails} from "../../../store/Interfaces/inteface";
import jwt_decode from "jwt-decode";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducers";

const ProfileRoll: React.FC = () => {
    let match = useRouteMatch();
    const loginDetail: {loginDetails:string} = useSelector((state: RootState) => state.loginReducer);
    const loginDetailsDecode:IloginDetails = jwt_decode(String(loginDetail.loginDetails == "" ? "" :loginDetail.loginDetails));
    const [role, setRole] = useState('seller');
    useEffect(() => {
        setRole(loginDetailsDecode.roll);
    }, [loginDetail]);

    return (
        <Col xs={12} className="profile-role-container">
            {role}
        </Col>
    );
};

export default ProfileRoll;