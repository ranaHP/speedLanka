import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {deleteLoginDetails} from "../../../store/actions/LoginActions";
import {useDispatch} from "react-redux";

const LogoutBTN : React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <a href={"/"}>
            <Navbar.Brand className="logout-btn ">
                <Button onClick={() => {

                    dispatch(deleteLoginDetails(1));
                }} >
                    Logout
                </Button>
            </Navbar.Brand>
        </a>
          
    );
}
export default LogoutBTN;