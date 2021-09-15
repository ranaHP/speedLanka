import React, {useEffect, useState} from "react";
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
    Spinner,
} from "react-bootstrap";
import {Eye, EyeOff} from "react-feather";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {url} from "../api/API";
import {useDispatch} from "react-redux";
import {setLoginDetails} from "../store/actions/LoginActions";
import {alertSystemAction} from "../store/actions/AlertSystem";
import MainNavBar from "../components/mainNavBar/MainNavBar";
import Footer from "../components/footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useMutation} from "@apollo/client";
import {CHECK_USER_LOGIN_VALIDATIONS} from "../api/user/mutations";
import jwt_decode from "jwt-decode";
import {IloginDetails} from "../store/Interfaces/inteface";

const Login: React.FC = () => {
    const history = useHistory();
    const [isHide, setIsHide] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const dispatch = useDispatch();
    const { register,reset, handleSubmit, watch, formState: { errors } } = useForm();

    const [checkUserLoginValidation, {data, loading, error}] = useMutation(CHECK_USER_LOGIN_VALIDATIONS);

    const onSubmit = async (form_data: any) => {
       try {
           const loginDetails = await checkUserLoginValidation({
               variables : {
                   contact: form_data.mobile ,
                   password: form_data.password
               }
           });
       } catch (e){
           // console.log(e);
           setErrorMessage(e);
           setErrorMessage("SpeedLanka system error E330 !" );
       }
        if (error) {
            // console.log(`Submission error! ${error}`);
            setErrorMessage("SpeedLanka system error E331 !" );
        };
    };

    useEffect(() => {
        if(!data) return;
        if(data.getUser.status === "fail"){
            setErrorMessage("Login details invalid!");
            toast.error('Login details invalid!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else if(data.getUser.status === "success"){
            setErrorMessage("Login Success");
            dispatch(setLoginDetails(data.getUser.data));
            const decodedData:IloginDetails[] = jwt_decode(String(data.getUser.data));
            // console.log(decodedData[0].roll);
            if(decodedData[0].roll == "seller") {
                setTimeout(() => {
                    history.push("/");

                }, 1000)
            }else if(decodedData[0].roll == "Admin"){
                setTimeout(() => {
                    history.push("/superadmin");

                }, 1000)
            }

            toast.success('Welcome to SPEEDLANKA!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [data]);

    return (
        <>
            <ToastContainer/>
            <MainNavBar componentType={"2"} />
            <Container fluid={true} className="register-container">
                <Row className="m-0 ">
                    <h3 className="mb-2 mb-3 text-center">SpeedLanka Login </h3>
                    <Col xs={12} sm={12} md={11} lg={10} xl={9} className=" m-auto">
                        <Row className="m-0">
                            <Col xs={12} sm={12} md={5} lg={5} xl={5} className=" form-container m-auto">
                                <Form onSubmit={handleSubmit(onSubmit)}>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="string" placeholder="ex: 0412283222" {...register("mobile",  { required: true, maxLength: 10 })}/>
                                        <Form.Text className="text-muted">
                                            {errors.mobile ? <span className="text-danger">This field is required valid phone number</span> : "We'll never share your phone number with anyone else." }
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Password</Form.Label>
                                        <InputGroup className="mb-2">
                                            <FormControl id="inlineFormInputGroup" placeholder="******" type={isHide ? "password": "text"} {...register("password", { required: true })} />
                                            <InputGroup.Text className="bg-white hideBTN" onClick={()=> { setIsHide(!isHide)}}>{ isHide ? <Eye color={"rgba(128,128,128,0.88)"}/> : <EyeOff color={"rgba(128,128,128,0.88)"}/> }</InputGroup.Text>
                                        </InputGroup>
                                        <Form.Text className="text-muted">
                                            {errors.password ? <span className="text-danger">This field is required</span> : "We'll never share your phone number with anyone else." }
                                        </Form.Text>

                                    </Form.Group>

                                    <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                        Password
                                    </Form.Label>
                                    {
                                        errorMessage != "" &&
                                        <Alert  className="alert alert-danger">
                                            {errorMessage}
                                        </Alert>
                                    }
                                    <Button type="submit" className="w-100" >
                                        {loading ? <Spinner animation="grow" /> : "Login"}
                                    </Button>
                                    <Form.Text className="text-muted mt-2">
                                        Don't you have account - <a href="#" onClick={() => {
                                        history.push("/register")
                                    }} > Register</a>
                                    </Form.Text>
                                </Form>
                            </Col>
                        </Row>
                    </Col>


                </Row>
            </Container>
            <Footer/>
        </>
    )
}

export default Login;