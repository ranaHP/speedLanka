import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const RegisterBTN : React.FC = () => {
    const history = useHistory();
    return (
        <Navbar.Brand className="register-btn ">
                <Button onClick={() => {
                    history.push("/checkout")
                }} >
                    Register
                </Button>
        </Navbar.Brand>
          
    );
}
export default RegisterBTN;