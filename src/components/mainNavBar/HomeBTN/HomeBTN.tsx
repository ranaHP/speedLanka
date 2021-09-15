import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const HomeBTN : React.FC = () => {
    const history = useHistory();
    return (
        <a href={"/"}>
            <Navbar.Brand className="register-btn ">
                <Button >
                    Home
                </Button>
            </Navbar.Brand>
        </a>
          
    );
}
export default HomeBTN;