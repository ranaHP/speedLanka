import React from "react";
import {Image, Navbar} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import logoImage from '../../../asset/images/logo/logo.jpg';
const Logo : React.FC = () => {
    const history = useHistory();
    return (
        <Navbar.Brand className="logo" onClick={() => {
            history.push("/")
        }} >
            <Image src={logoImage} fluid={true} width={70}/>

        </Navbar.Brand>
          
    );
}
export default Logo;