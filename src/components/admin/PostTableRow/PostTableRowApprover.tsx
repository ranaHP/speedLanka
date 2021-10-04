import React, {useState} from 'react';
import {IAttribute, IFormDataResponse} from "../../../types/MainTypes";
import {Button, Col, Form, Image, Modal, Row, Table} from "react-bootstrap";
import PostEditModel from "../postEditModel/PostEditModel";

type PostTableRowProps = {
    post: IFormDataResponse
    componentType?: String
}
const PostTableRowApprover : React.FC<PostTableRowProps> = ( props ) => {
    const [changeStatus, setChangeStatus] = useState<string>("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleOnStatusChange = () => {

    }
    const handleOnPostEdit = () => {

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
        if(props.componentType){
            if(props.componentType == 'super'){
                if (status == "approved") {
                    return (
                        <>
                            <Button className="action-btn" onClick={() => {
                                handleOnStatusChange()
                            }}> cancel </Button>
                        </>
                    )
                }
                if (status == "canceled") {
                    return (
                        <>
                            {/*<Button className="action-btn" > renew </Button>*/}
                            <p> no action</p>
                        </>
                    )
                }
                if (status == "reject") {
                    return (
                        <>
                            <Button className="action-btn" onClick={() => {handleOnGetReason()}}> send message </Button>
                        </>
                    )
                }
                if (status == "pending") {
                    return (
                        <>

                            <Button className="action-btn"> approve </Button>
                            <Button className="action-btn" onClick={() => {
                                setChangeStatus("pending");
                                setShowConfirm(true);
                            }}> reject </Button>
                        </>
                    )
                }
                if (status == "expired") {
                    return (
                        <>
                            <p> no action</p>
                        </>
                    )
                }
            }else if(props.componentType == 'approve'){

            }else {
                if (status == "approved") {
                    return (
                        <>
                            <Button className="action-btn" onClick={() => {
                                handleOnStatusChange()
                            }}> canceled </Button>
                        </>
                    )
                }
                if (status == "canceled") {
                    return (
                        <>
                            {/*<Button className="action-btn" > renew </Button>*/}
                            <p> no action</p>
                        </>
                    )
                }
                if (status == "reject") {
                    return (
                        <>
                            <Button className="action-btn" onClick={() => {
                                setChangeStatus("pending");
                                setShowConfirm(true);
                            }}> request </Button>
                            <Button className="action-btn" onClick={() => {
                                setChangeStatus("");
                                setShowConfirm(true);
                            }}> edit </Button>
                            <Button className="action-btn" onClick={() => {handleOnGetReason()}}> reason </Button>
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
                                setChangeStatus("pending");
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
        }

    }
    return (
        <tr>
            {/*for edit from*/}
            <PostEditModel isShow={showEdit} isHide={ () => { setShowEdit(false)}} post={props.post}/>
            <Modal
                show={showConfirm}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>SPEEDLANKA Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    asdasdasdasd
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => {setShowConfirm(false)}}>
                        Close
                    </Button>
                    <Button variant="primary" > agreed</Button>
                </Modal.Footer>
            </Modal>


            <td><Image src={props.post.images == "" ? "" : props.post.images} height="50px"/></td>
            <td>{props.post.title}</td>
            <td>{props.post._id}</td>
            <td>{props.post.desc}</td>
            <td>{props.post.location}</td>
            <td>{props.post.cType}</td>
            <td>{props.post.displayNumber}</td>
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
    )
}
export default PostTableRowApprover;