import React, {useEffect, useState} from 'react';
import {Col} from "react-bootstrap";
import {useSelector} from "react-redux";
import {IloginDetails} from "../../../store/Interfaces/inteface";
import jwt_decode from "jwt-decode";
import {RootState} from "../../../store/reducers/rootReducers";


const ProfileName: React.FC = () => {
    const loginDetail: {loginDetails:string} = useSelector((state: RootState) => state.loginReducer);
    const [name, setName] = useState('user');
    useEffect(() => {
        const loginDetailsDecode:IloginDetails = jwt_decode(String(loginDetail.loginDetails == "" ? "" :loginDetail.loginDetails));
        setName(loginDetailsDecode.name);
    }, [loginDetail]);

    return (
        <Col xs={12} className="profile-title-container">
            {name}
        </Col>
    );
};

export default ProfileName;