import React, {useEffect, useState} from 'react';
import {IAttribute, IFormDataResponse, IWeddingResponse} from "../../../types/MainTypes";
import {Button, Col, Form, Image, Modal, Row, Table} from "react-bootstrap";
import PostEditModel from "../postEditModel/PostEditModel";
import {toast, ToastContainer} from "react-toastify";
import {useMutation} from "@apollo/client";
import {Change_Status_Wedding_Post, SET_STATUS_CHANGE} from "../../../api/admin/mutations";
import {imageGetUrl, imageUploadUrl} from "../../../api/API";
import axios from "axios";

type PostTableRowProps = {
    post: IWeddingResponse
    reload: () => void

}
const WeddingPostTableRow: React.FC<PostTableRowProps> = (props) => {
    const [changeStatus, setChangeStatus] = useState<string>("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [ChangeStatus, {data, loading, error}] = useMutation(Change_Status_Wedding_Post);
    const [showGetMessage, setShowGetMessage] = useState(false);
    const [popupMessage, setPopupMessage] = useState<string>("");
    const [rejectMessage, setRejectMessage] = useState<string>("");
    const [imageWeddingURL, setImageWeddingURL] = useState<string>("");
    const [showReject, setShowReject] = useState(false);

    const handleOnGetMessage = () => {
        if(props.post.message){
            setRejectMessage("no reason");
        }else{
            setRejectMessage(String(props.post.message));
        }
    }

    const handleOnStatusChange = async () => {
        setShowConfirm(false);
        setShowEdit(false);
        try {
            const newPost = await ChangeStatus({
                variables: {
                    _id: props.post._id,
                    status: changeStatus,
                    message: rejectMessage
                }
            });
            toast.success('Advertisement action successfully done!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            console.log("SPEEDLANKA Error 246");
            toast.error('Error 246, Please contact technicians', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (loading) {
            setPopupMessage("loading ...");
        }
        props.reload();
        setPopupMessage("");
        setChangeStatus("");
        setRejectMessage("");
    }
    const handleOnGetReason = () => {

    }
    const getImageUrl = (image: string) : string => {
        console.log(image);
        return image;
    }

    const getImageAccessUrl = ( ) => {
        const generateGetUrl = imageGetUrl;
        const options = {
            params: {
                Key: props.post.image,
                ContentType: 'image/jpeg'
            }
        };
        axios.get(generateGetUrl, options).then(res => {
            const { data: getURL } = res;
            setImageWeddingURL(getURL);
        });
    }

    useEffect(() => {
        if(!props.post) return;

        getImageAccessUrl();
    }, [props.post]);
    const handleOnStatus = (status: String) => {
        if (status == "approved") {
            return (
                <p className="success bold"> {status} </p>
            )
        }
        if (status == "canceled") {
            return (
                <p className="danger bold"> {status} </p>
            )
        }
        if (status == "reject") {
            return (
                <p className="danger bold"> {status} </p>
            )
        }
        if (status == "pending") {
            return (
                <p className="warning bold"> {status} </p>
            )
        }
        if (status == "expired") {
            return (
                <p className="danger bold"> {status} </p>
            )
        }


    }
    const handleOnAction = (status: string, id: string, post: IWeddingResponse) => {

        if (status == "approved") {
            return (
                <>
                    <Button className="action-btn" onClick={() => {
                        // handleOnStatusChange()
                        setChangeStatus("canceled");
                        setPopupMessage("Are you want to cancel approval to this advertisement ?");
                        setRejectMessage("");
                        setShowConfirm(true);
                    }}> canceled </Button>
                </>
            )
        }
        if (status == "canceled") {
            return (
                <>
                    {/*<Button className="action-btn" > renew </Button>*/}
                    <Button className="action-btn" onClick={() => {
                        setChangeStatus("pending");
                        setPopupMessage("Are you want to request approval to this advertisement ?");
                        setRejectMessage("");
                        setShowConfirm(true);
                    }}> request </Button>
                    <Button className="action-btn" onClick={() => {
                        setChangeStatus("");
                        setShowEdit(true);
                    }}> edit </Button>
                </>
            )
        }
        if (status == "reject") {
            return (
                <>
                    <Button className="action-btn" onClick={() => {
                        setChangeStatus("pending");
                        setPopupMessage("Are you want to request approval to this advertisement ?");
                        setRejectMessage("");
                        setShowConfirm(true);
                    }}> request </Button>
                    <Button className="action-btn" onClick={() => {
                        setChangeStatus("");
                        setShowEdit(true);
                    }}> edit </Button>
                    <Button className="action-btn" onClick={() => {
                        setChangeStatus("reject");
                        setPopupMessage("");
                        if(props.post.message){
                            setRejectMessage(String(props.post.message));
                        }else{
                            setRejectMessage("no reason");
                        }
                        setShowReject(true);
                    }}> message </Button>
                </>
            )
        }
        if (status == "pending") {
            return (
                <>
                    <Button className="action-btn" onClick={() => {
                        setShowEdit(true);
                    }}> edit </Button>
                    <Button className="action-btn"> payment </Button>
                    <Button className="action-btn" onClick={() => {
                        setChangeStatus("canceled");
                        setPopupMessage("Are you want to cancel approval request to this advertisement ?");
                        setRejectMessage("");
                        setShowConfirm(true);

                    }}> cancel </Button>
                </>
            )
        }
        if (status == "expired") {
            return (
                <>
                    <Button className="action-btn"> renew </Button>
                </>
            )
        }
    }
    const getPostedData = (data: String) => {
      return String(new Date(Number(data))).split("GMT")[0]
    }
    return (
        <>
            <Modal
                show={showGetMessage}
                backdrop="static"
                keyboard={false}
                onHide={() => setShowGetMessage(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>SPEEDLANKA Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {popupMessage}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Reason</Form.Label>
                        <Form.Control type="text" placeholder="reason to reject" onChange={(e) => {
                            setRejectMessage(e.target.value);
                        }}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setShowGetMessage(false)
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleOnGetMessage}> reject </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showConfirm}
                backdrop="static"
                keyboard={false}
                onHide={() => setShowEdit(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>SPEEDLANKA Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {popupMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setShowConfirm(false)
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleOnStatusChange}> yes</Button>
                </Modal.Footer>
            </Modal>

            <tr>
                {/*for edit from*/}
                {/*<PostEditModel isShow={showEdit} isHide={() => {*/}
                {/*    setShowEdit(false)*/}
                {/*}} post={props.post}/>*/}
                <Modal
                    show={showReject}
                    backdrop="static"
                    keyboard={false}
                    onHide={ ( ) => { setShowReject(false)}}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>SPEEDLANKA Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        This advertisement is rejected. Because,
                        <br/>
                        <b>{rejectMessage}</b>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            setShowReject(false)
                        }}>
                            Done
                        </Button>
                    </Modal.Footer>
                </Modal>


                <td>
                    <ToastContainer/>
                    <Image src={props.post.image == "" ? "" : imageWeddingURL} height="50px"/>
                </td>
                <td>{props.post.fname + " " + props.post.fname }</td>
                <td>{props.post.age}</td>
                <td>{props.post.email}</td>
                <td>{props.post.gender}</td>
                <td>{props.post.mobile}</td>
                <td>{props.post.bodyType}</td>
                <td>{props.post.height}</td>
                <td>{props.post.approved}</td>
                <td>{getPostedData(props.post.date)}</td>
                <td>{props.post.maritalStatus}</td>
                <td>{props.post.dob}</td>
                <td>{props.post.message}</td>
                <td>{props.post.location}</td>
                <td>{props.post.nationality}</td>
                <td>{props.post.religion}</td>
                <td>{props.post.educationLevel}</td>
                <td>{props.post.job}</td>
                <td>{props.post.language}</td>
                <td>{props.post.lagnaya}</td>
                <td>{props.post.desc}</td>
                <td id="status">{
                    handleOnStatus(props.post.approved)
                }</td>
                <td>
                    <div className="actions">
                        {
                            handleOnAction(props.post.approved, props.post._id, props.post)
                        }
                    </div>
                </td>
            </tr>

        </>
    )
}
export default WeddingPostTableRow;
