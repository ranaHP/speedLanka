import React from 'react';
import {Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
// import avatar from "../../../asset/images/admin/avatar.png";
import logo from "../../../asset/images/logo/logo.jpg";


const ProfileImage: React.FC = () => {
    return (
        <Col xs={12} className="profile-image-container">
            <Image src={logo} className="profile-image m-auto"/>
        </Col>
    );
};

export default ProfileImage;