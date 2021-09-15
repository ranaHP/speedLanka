import React, {useEffect, useState} from "react";
import { Button, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducers";
import {IloginDetails} from "../../../store/Interfaces/inteface";
import jwt_decode from "jwt-decode";

const DashboardBTN : React.FC = () => {
    const history = useHistory();
    const loginDetail: {loginDetails:string} = useSelector((state: RootState) => state.loginReducer);
    const [loginDetailsDecodes, setLoginDetailsDecodes] = useState<IloginDetails[] | null>( null);

    useEffect(() => {
        try{
            setLoginDetailsDecodes(jwt_decode(String(loginDetail.loginDetails ? loginDetail.loginDetails : "")));
        }catch (e){
            history.push("/");
        }
    }, [loginDetail]);

    return (
        <Navbar.Brand className="register-btn ">
                <Button onClick={() => {
                    if(!loginDetailsDecodes) return;
                    if(loginDetailsDecodes[0].roll == "seller"){
                        history.push("/dashboard")
                    }else if(loginDetailsDecodes[0].roll == "Admin"){
                        history.push("/superadmin")
                    }
                }} >
                    Dashboard
                </Button>
        </Navbar.Brand>
          
    );
}
export default DashboardBTN;