import React, {FormEvent, useEffect, useState} from "react";
import {Alert, Button, Carousel, Col, Container, Form, FormControl, InputGroup, Row, Spinner} from "react-bootstrap";
import {Eye, EyeOff} from "react-feather";
import {useHistory} from "react-router-dom";
import LocationSelector from "../components/subComponenets/locationSelector/LocationSelector";
import {ILocation} from "../types/MainTypes";
import { useForm } from "react-hook-form";
import axios from "axios";
import {SMSurl, url} from "../api/API";
import PostDesc from "../components/postDesc/PostDesc";
import smsVerification from "../components/smsVerification/smsVerification";
import SMSVerification from "../components/smsVerification/smsVerification";
import {useDispatch} from "react-redux";
import MainNavBar from "../components/mainNavBar/MainNavBar";
import Footer from "../components/footer/Footer";
import {useMutation} from "@apollo/client";
import {CHECK_USER_LOGIN_VALIDATIONS, USER_REGISTRATION} from "../api/user/mutations";
import {toast, ToastContainer} from "react-toastify";
import {setLoginDetails} from "../store/actions/LoginActions";
import HomeHeader from "../components/Home/HomeHeader/HomeHeader";
import HomeFooter from "../components/Home/HomeFooter/HomeFooter";

export interface ITempFormData {
    cpassword: string
    email: string
    mobile: string
    name: string
    password: string
    address: string
}
export  const tempFormData:ITempFormData = {
    cpassword: "",
    email: "",
    mobile: "",
    name: "",
    password: "",
    address: ""
}
const Register: React.FC = () => {
    const [isHide, setIsHide] = useState<boolean>(true);
    const [isCHide, setIsCHide] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const history = useHistory();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [formData, setFormData] = useState<ITempFormData>(tempFormData);
    const [modalShow, setModalShow] = React.useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMobileVerified, setIsMobileVerified] = useState<boolean>(false);
    const [registerUser, {data, loading, error}] = useMutation(USER_REGISTRATION);

    const handleOnModelLoad = () => {
        setModalShow(false);
    }

    const onSubmit = (data: ITempFormData) => {
        setIsLoading(true);
        setFormData(data);
        if(errorMessage == ""){
            setModalShow(true);
        }
    };

    const dispatch = useDispatch();

    const handleOnRegisterUSer = async () => {
        setModalShow(false);
        if (!formData) {
            setErrorMessage("Registration failed");
            setIsLoading(false);
            return;
        }
        try {
            const loginDetails = await registerUser({
                variables: {
                    contact: formData.mobile,
                    password: formData.password,
                    _id: formData.mobile,
                    name: formData.name,
                    email: formData.email,
                    address: formData.address,
                }
            });
        } catch (e) {
            setErrorMessage("This mobile number already used!");
            toast.error('Registration invalid! \n This mobile number already used!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsLoading(false);
        }
        if (error) {
            setErrorMessage("SpeedLanka system error E334 !");
            setIsLoading(false);
        }
        ;

    }

    useEffect(() => {
        if(!data) return;
        if(data.createUser._id != ""){
            setErrorMessage("");
            // dispatch(setLoginDetails(data.getUser.data));
            setTimeout(() => {
                history.push("/login");

            }, 5000)
            toast.success('Registration Success! Welcome to SPEEDLANKA!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setIsLoading(false);

    }, [data]);

    const onFormClose = ( ) => {
        setIsLoading(false);
        setModalShow(false);
    }
    return (
        <>

            {/*<MainNavBar componentType={"2"} />*/}
            <ToastContainer/>
            <div className="user-login">
                <HomeHeader/>
                <div className="user-login-content">
                    <Container fluid={true} className="register-container">

                        <SMSVerification onFormClose={onFormClose} onSuccess={handleOnRegisterUSer} onHide={handleOnModelLoad} show={modalShow} mobileNumber={watch('mobile')}/>

                        <Row className="m-0">
                            <h3 className="mb-2 mb-3 text-center">SpeedLanka Registration </h3>
                            <Col xs={12} sm={12} md={11} lg={10} xl={9} className=" m-auto">
                                <Row className="m-0">

                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className=" form-container m-auto">

                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <Form.Group className="mb-3 w-100" >
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control type="text" placeholder="ex: jone" {...register("name", { required: true })}/>
                                                <Form.Text className="text-muted">
                                                    {errors.name ? <span className="text-danger">This field is required</span> : "We'll never share your phone number with anyone else." }
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group className="mb-3" >
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="number" placeholder="ex: 07* **** ***"  {...register("mobile",  { required: true, maxLength: 10 })}/>
                                                <Form.Text className="text-muted">
                                                    {errors.mobile ? <span className="text-danger">This field is required valid phone number</span> : "We'll never share your phone number with anyone else." }
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group className="mb-3" >
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" aria-autocomplete="none" placeholder="ex: ABC@ABC.com" {...register("email",  { required: true })}/>
                                                <Form.Text className="text-muted">
                                                    {errors.email ? <span className="text-danger">This field is required valid email</span> : "We'll never share your phone number with anyone else." }
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group className="mb-3" >
                                                <Form.Label>Location</Form.Label>
                                                <Form.Control type="text" placeholder="ex: ********" {...register("address",  { required: true })}/>
                                                <Form.Text className="text-muted">
                                                    {errors.address ? <span className="text-danger">This field is required valid address</span> : "We'll never share your phone number with anyone else." }
                                                </Form.Text>
                                            </Form.Group>

                                            <Form.Group className="mb-3" >
                                                <Form.Label>Password</Form.Label>
                                                <InputGroup className="mb-2">
                                                    <FormControl id="inlineFormInputGroup" placeholder="******" type={isHide ? "password": "text"} {...register("password", { required: true })} />
                                                    <InputGroup.Text className="bg-white hideBTN" onClick={()=> { setIsHide(!isHide)}}>{ isHide ? <Eye color={"rgba(128,128,128,0.88)"}/> : <EyeOff color={"rgba(128,128,128,0.88)"}/> }</InputGroup.Text>
                                                </InputGroup>
                                                <Form.Text className="text-muted">
                                                    {errors.password ? <span className="text-danger">This field is required</span> : "" }
                                                </Form.Text>

                                            </Form.Group>

                                            <Form.Group className="mb-3" >
                                                <Form.Label>Confirm Password</Form.Label>
                                                <InputGroup className="mb-2">
                                                    <FormControl id="inlineFormInputGroup" placeholder="******" type={isCHide ? "password": "text"} {...register("cpassword", { required: true })}  />
                                                    <InputGroup.Text className="bg-white hideBTN" onClick={()=> { setIsCHide(!isCHide)}}>{ isCHide ? <Eye color={"rgba(128,128,128,0.88)"}/> : <EyeOff color={"rgba(128,128,128,0.88)"}/> }</InputGroup.Text>
                                                </InputGroup>
                                                <Form.Text className="text-muted">
                                                    {errors.cpassword ? <span className="text-danger">This field is required</span> : "" }
                                                </Form.Text>
                                            </Form.Group>
                                            {
                                                errorMessage != "" &&
                                                <Alert  className="alert alert-danger">
                                                    {errorMessage}
                                                </Alert>
                                            }
                                            <Button type="submit" className="w-100"  onClick={ () => {
                                                setIsLoading(true);

                                                if(watch("password") != watch("cpassword")){
                                                    setErrorMessage("Password are not matched !");

                                                    setIsLoading(false);
                                                    return;
                                                }
                                                if(watch("mobile").length != 10){
                                                    setErrorMessage("Mobile number invalid!");
                                                    setIsLoading(false);
                                                    return;
                                                }
                                                setErrorMessage("");
                                                setIsLoading(false);
                                            }}>
                                                {isLoading ? <Spinner animation="grow" /> : "Register"}
                                            </Button>

                                            <Form.Text className="text-muted mt-1">
                                                Already have account - <a href="#" onClick={() => {
                                                history.push("/login")
                                            }} > Login</a>
                                            </Form.Text>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <HomeFooter/>
            </div>
        </>
    )
}

export default Register;
