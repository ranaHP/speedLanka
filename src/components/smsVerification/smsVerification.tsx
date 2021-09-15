import React, {FormEvent, useState} from "react";
import {Alert, Button, Col, Form, Image, Modal, Row, Spinner} from "react-bootstrap";
import {IFormData} from "../../types/MainTypes";
import axios from "axios";
import {SMSurl} from "../../api/API";
import Logo from "../mainNavBar/Logo/Logo";

type smsVerificationProps = {
    onHide: () => void
    show: boolean
    mobileNumber: string
    onSuccess: () => void
    onFormClose: () => void

}
const RandomNumber = Math.floor(1000 + Math.random() * 9000);
const SMSVerification: React.FC<smsVerificationProps> = (props) => {
    const [optFiled1, setOpt1Filed] = useState<number | null>(null);
    const [optFiled2, setOpt2Filed] = useState<number | null>(null);
    const [optFiled3, setOpt3Filed] = useState<number | null>(null);
    const [optFiled4, setOpt4Filed] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOtpSend, setIsOtpSend] = useState<boolean>(false);

    const onHandleSMSOTPSend = () => {
        // props.onSuccess();
        setIsLoading(true);
        if (!props.mobileNumber) return;
        axios.post(SMSurl + `message=${RandomNumber}&to=${props.mobileNumber}`).then(res => {
            setIsOtpSend(true);
            if (res.data.status == "success" && res.data.result == "sent") {
                setIsLoading(false);
            } else {
                setErrorMessage("SMS verification error!. please contact technician")
            }
            setIsLoading(false);
        });

    }
    const onHandleOPTSubmit = () => {
        const userOTP: string = String(optFiled1) + String(optFiled2) + String(optFiled3) + String(optFiled4);
        if (userOTP === String(RandomNumber)) {
            setErrorMessage("");
            props.onSuccess();
        } else {
            setErrorMessage("Invalid OTP!");
            setOpt1Filed(null);
            setOpt2Filed(null);
            setOpt3Filed(null);
            setOpt4Filed(null);

        }
    }

    const handleONResendOTP = () => {
        setIsLoading(true);
        setErrorMessage("");
        setOpt1Filed(null);
        setOpt2Filed(null);
        setOpt3Filed(null);
        setOpt4Filed(null);
        onHandleSMSOTPSend();
    }
    const handleClose = () => {
        setIsLoading(false);
        setIsOtpSend(false);
        props.onFormClose();
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    SMS Verification
                </Modal.Title>

            </Modal.Header>
            <Modal.Body className="text-center sms-verification">
                {isOtpSend &&
                <Form>
                    <Row>
                        <Col xs={12} sm={9} md={8} lg={8} xl={8} className="m-auto ">
                            <Form.Label>OTP</Form.Label>
                            <Row>

                                <Form.Group className="mb-3 col-3">

                                    <Form.Control type="number" onChange={(e) => {
                                        setOpt1Filed(Number(e.target.value[e.target.value.length - 1]));
                                    }}
                                                  value={String(optFiled1)}
                                                  required
                                    />

                                </Form.Group>
                                <Form.Group className="mb-3 col-3">

                                    <Form.Control type="number" onChange={(e) => {
                                        setOpt2Filed(Number(e.target.value[e.target.value.length - 1]));
                                    }}
                                                  value={String(optFiled2)}
                                                  required/>


                                </Form.Group>
                                <Form.Group className="mb-3 col-3">
                                    <Form.Control type="number" onChange={(e) => {
                                        setOpt3Filed(Number(e.target.value[e.target.value.length - 1]));
                                    }}
                                                  value={String(optFiled3)}
                                                  required/>


                                </Form.Group>
                                <Form.Group className="mb-3 col-3">

                                    <Form.Control type="number" onChange={(e) => {
                                        setOpt4Filed(Number(e.target.value[e.target.value.length - 1]));
                                    }}
                                                  value={String(optFiled4)}
                                                  required/>


                                </Form.Group>


                            </Row>

                            {errorMessage !== "" &&
                            <div className="text-danger p-4">Invalid OTP*</div>
                            }
                        </Col>
                    </Row>
                    <Button onClick={ () => {
                        onHandleOPTSubmit()
                    }} >
                        Submit
                    </Button>
                    <br/>
                    <br/>
                    <a className="text-primary" onClick={handleONResendOTP}> {isLoading ? <><Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> sending...</> : "Resend OTP"}</a>
                </Form>}

                {!isOtpSend &&
                    <>
                    <h6>Your mobile number : {props.mobileNumber} </h6>
                    <Button className="btn btn-primary" onClick={() => {
                        onHandleSMSOTPSend();


                        setIsLoading(true);
                    }}>
                        {isLoading ? <><Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> sending...</> : " Send OTP"}
                    </Button>
                    </>


                }

            </Modal.Body>
            <Modal.Footer>
                {/*<Button onClick={props.onHide}>Close</Button>*/}
                <div className="sms-logo">
                   SpeedLanka
                </div>
            </Modal.Footer>
        </Modal>
    )
}
export default SMSVerification;