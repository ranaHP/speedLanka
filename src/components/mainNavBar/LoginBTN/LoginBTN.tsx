import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LoginBTN : React.FC = () => {
    const history = useHistory();
    return (
        <Navbar.Brand className="login-btn ">
                <Button onClick={() => {
                    history.push("/login")
                }} >
                    Login
                </Button>
        </Navbar.Brand>
          
    );
}
export default LoginBTN;