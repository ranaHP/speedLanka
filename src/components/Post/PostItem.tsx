import React, {useState, useEffect,} from "react";
import {Button, Col, Image, Nav, Navbar, Row} from "react-bootstrap";
import {
    AlertTriangle,
    DollarSign,
    FileText,
    Map, MapPin,
    PhoneCall,
    PhoneMissed,
    Shield,
    ShieldOff,
    ShoppingBag,
    Star, User
} from "react-feather";
import PostDesc from "../postDesc/PostDesc";
import VerifiedUser from "../verifiedUser/VerifiedUser";
import Favorit from "../favorit/Favorit";
import {IFormData} from "../../types/MainTypes";
import PostApproved from "../postApproved/PostApproved";
import Placeholder from "../../asset/images/placeolder/placeholder1.jpg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducers";
import {addFavPostItem} from "../../store/actions/CheckoutActions";
import PostedDate from "../postedDate/PostedDate";
import axios from "axios";
import {url} from "../../api/API";
import {useMutation} from "@apollo/client";
import {GET_UNVERIFIED_POST} from "../../api/admin/queries";
import {Approved_ADS} from "../../api/admin/mutations";
import {toast, ToastContainer} from "react-toastify";

type PostItemProps = {
    componentType: string
    postData?: IFormData | null
    givePermission?: () => void

}
const PostItem: React.FC<PostItemProps> = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const tempPostItem: IFormData[] = useSelector((state: RootState) => state.tempPostReducer.tempPostItem);

    const dispatch = useDispatch();
    const handleOnModelLoad = () => {
        setModalShow(false);
    }
    const [postData, setPostData] = useState<IFormData>();

    const [giveApprovedPost, {data, loading, error}] = useMutation(Approved_ADS);

    useEffect(() => {
        if (props.postData) {
            setPostData(props.postData);
        }
    }, [props.postData]);

    const handleOnAdsGiveApproved = async (id: string) => {
        try {
            const isGiveApproved = await giveApprovedPost({variables: {_id: id}});
        } catch (err) {
            console.log(err);
            toast.error('There was a problem with giving the approval to post!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        };
    }

    useEffect(() => {
        if(!data) return;
        if(data.approvedPost.isUpdated){
            toast.success('Post successfully approved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.givePermission?.();
        }else{
            toast.error('There was a problem with giving the approval to post!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [data]);

    return (
        <Col xs={12} sm={12} md={12} lg={11} xl={11} className="m-auto  postItem">
            <ToastContainer/>
            {
                props.componentType !== "3" &&
                <>
                    {props.postData &&
                    <PostDesc postData={props.postData} onHide={handleOnModelLoad} show={modalShow}/>
                    }
                    <Row className="p-0 m-0">
                        {props.postData &&
                        <>
                            <Col xs={12} sm={12} md={3} lg={2} xl={2} className="image mb-1 pr-1">
                                <Image src={props.postData.images == "" ? props.postData.images : Placeholder}
                                       fluid={true}/>
                            </Col>
                            <Col xs={12} sm={12} md={5} lg={7} xl={7} className="desc">
                                <ul>
                                    <li className="title"><b>{props.postData.title}</b></li>
                                    <li className="desc"><ShoppingBag size={18}
                                                                      color="gray"/> {props.postData.cType}
                                    </li>
                                    <li className="location"><MapPin size={18}
                                                                     color="gray"/> {props.postData.location}
                                    </li>
                                    <li className="price"><DollarSign size={18}
                                                                      color="gray"/> (Rs) {props.postData.price}.00
                                    </li>
                                    <li className="desc"><FileText size={18} color="gray"/> {props.postData.desc}

                                    </li>
                                    <li className="phone-number"><User size={18}
                                                                       color="gray"/> by {props.postData.sellerName}
                                    </li>
                                </ul>
                            </Col>
                            {
                                props.componentType === "1" &&
                                <Col xs={12} sm={12} md={4} lg={3} xl={3} className="action">
                                    <Button className="btn btn-outline-success my-4 bg-white  border-0 ">
                                        <PostApproved approved={props.postData.approved}/>
                                    </Button>
                                    {/*<Button className="btn btn-warning mb-4  update ">*/}
                                    {/*    Edit*/}
                                    {/*</Button>*/}
                                    <Button className="btn  view-btn mb-2 btn btn-success "
                                            onClick={() => setModalShow(true)}>
                                        View
                                    </Button>
                                    <Button className="btn btn-danger mb-4">
                                        Delete
                                    </Button>
                                </Col>
                            }
                            {
                                props.componentType === "2" &&
                                <Col xs={12} sm={12} md={4} lg={3} xl={3} className="action">
                                    <VerifiedUser approved={props.postData.approved}/>
                                    <Favorit postData={props.postData} componentType={"2"}/>
                                    <Button className="btn  view-btn mb-4 btn btn-success "
                                            onClick={() => setModalShow(true)}>
                                        View
                                    </Button>
                                </Col>
                            }
                            {
                                props.componentType === "4" &&
                                <Col xs={12} sm={12} md={4} lg={3} xl={3} className="action">
                                    <Button className="btn give-approved btn btn-warning mb-2 "
                                            onClick={() => {
                                                if (!props.postData) return;
                                                handleOnAdsGiveApproved(props.postData._id);
                                            }}>
                                        Give Approved
                                    </Button>
                                    <Button className=" give-approved btn btn-primary mb-2 "
                                    >
                                        Message
                                    </Button>
                                    <Button className="btn  view-btn mb-4 btn btn-success "
                                            onClick={() => setModalShow(true)}>
                                        View
                                    </Button>
                                </Col>
                            }
                        </>
                        }
                    </Row>
                </>


            }
            {
                props.componentType === "3" && tempPostItem &&
                <>
                    {tempPostItem &&
                    <PostDesc postData={tempPostItem[0]} componentType={"3"} onHide={handleOnModelLoad}
                              show={modalShow}/>
                    }
                    <Row className="p-0 m-0">
                        {tempPostItem &&
                        <>
                            <Col xs={12} sm={12} md={3} lg={2} xl={2} className="image">
                                <Image src={tempPostItem[0].images === "" ? Placeholder : tempPostItem[0].images}
                                       fluid={true}/>
                            </Col>
                            <Col xs={12} sm={12} md={5} lg={7} xl={7} className="desc">
                                <ul>
                                    <li className="title"><b>{tempPostItem[0].title}</b></li>
                                    <li className="location"><MapPin size={18}
                                                                     color="gray"/> {tempPostItem[0].location}
                                    </li>
                                    <li className="phone-number"><ShoppingBag size={18}
                                                                              color="gray"/> {tempPostItem[0].cType}
                                    </li>
                                    <li className="price"><DollarSign size={18}
                                                                      color="gray"/> (Rs) {tempPostItem[0].price}.00
                                    </li>
                                    <li className="desc"><FileText size={18} color="gray"/> {tempPostItem[0].desc}</li>
                                    <br/>
                                    <li className="desc"><User size={18} color="gray"/> by {tempPostItem[0].sellerName}
                                    </li>
                                </ul>
                            </Col>

                            <Col xs={12} sm={12} md={4} lg={3} xl={3} className="action">
                                <VerifiedUser approved={tempPostItem[0].approved}/>
                                {/*<Favorit postData={tempPostItem[0]} componentType={props.componentType}/>*/}
                                <Button className="btn  view-btn mb-2 btn btn-success "
                                        onClick={() => setModalShow(true)}>
                                    View
                                </Button>

                                <PostedDate
                                    date={tempPostItem[0] && tempPostItem[0].date.split(" ")[0] + '-' + tempPostItem[0].date.split(" ")[1] + '-' + tempPostItem[0].date.split(" ")[2] + '-' + tempPostItem[0].date.split(" ")[3]}/>

                            </Col>

                        </>
                        }
                    </Row>
                </>


            }


        </Col>
    );
}

export default PostItem;