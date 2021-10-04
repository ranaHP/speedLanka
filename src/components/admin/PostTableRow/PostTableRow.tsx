import React, {useState} from 'react';
import {IAttribute, IFormDataResponse} from "../../../types/MainTypes";
import {Button, Col, Form, Image, Modal, Row, Table} from "react-bootstrap";
import PostEditModel from "../postEditModel/PostEditModel";
import {toast, ToastContainer} from "react-toastify";
import {useMutation} from "@apollo/client";
import {SET_STATUS_CHANGE} from "../../../api/admin/mutations";

type PostTableRowProps = {
    post: IFormDataResponse
    reload: () => void

}
const PostTableRow: React.FC<PostTableRowProps> = (props) => {
    const [changeStatus, setChangeStatus] = useState<string>("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [ChangeStatus, {data, loading, error}] = useMutation(SET_STATUS_CHANGE);
    const [showGetMessage, setShowGetMessage] = useState(false);
    const [popupMessage, setPopupMessage] = useState<string>("");
    const [rejectMessage, setRejectMessage] = useState<string>("");
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
    const handleOnAction = (status: string, id: string, post: IFormDataResponse) => {

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
                        setPopupMessage("Are you want to cancel approval to this advertisement ?");
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
                <PostEditModel isShow={showEdit} isHide={() => {
                    setShowEdit(false)
                }} post={props.post}/>
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
                    <Image src={props.post.images == "" ? "" : props.post.images} height="50px"/>
                </td>
                <td>{props.post.title}</td>
                <td>{props.post._id}</td>
                <td>{props.post.desc}</td>
                <td>{props.post.location}</td>
                <td>{props.post.cType}</td>
                <td>{props.post.displayNumber}</td>
                {/*<td>{props.post.message}</td>*/}

                <td id="status">{
                    handleOnStatus(props.post.approved)
                }</td>
                <td>{props.post.date}</td>
                <td>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>prop</th>
                            <th>desc</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            JSON.parse(props.post.attribute).map((item: IAttribute, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.desc}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </td>
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
export default PostTableRow;