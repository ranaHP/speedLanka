import React from 'react';
import {Button, Image} from "react-bootstrap";
import PostImage from '../../../asset/images/postItem/banner1.jpg';
import PostItem from "../../Post/PostItem";
import {IFormData, IFormDataResponse} from "../../../types/MainTypes";
import UserPostPopup from "../../userPostPopup/UserPostPopup";
import {Star} from "react-feather";

type AdsPostItemProps = {
    postData: IFormDataResponse

}
const AdsPostItem: React.FC<AdsPostItemProps> = (props) => {
    const [modalPostPopupShow, setModalPostPopupShow] = React.useState(false);
    return (
        <>
            <div className="ads-item-container">
                <UserPostPopup onHide={() => {
                    setModalPostPopupShow(false)
                }} show={modalPostPopupShow} postData={props.postData}/>

                <div className="home-post-item">
                    <div className="image zoom">
                        <Image src={PostImage} width="100%"/>
                    </div>
                    <div className="home-user-text-content">
                        <Button className="btn btn-danger view-more-btn" onClick={() => {
                            setModalPostPopupShow(true)
                        }}> View Post</Button>
                        {/*<div className="btn fav-btn" onClick={() => {*/}
                        {/*    setModalPostPopupShow(true)*/}
                        {/*}}> <Star/> </div>*/}
                        <div className="home-user-text-content-title">
                            {/*Honda CB Hornet Special Edition 2019*/}
                            {props.postData.title}
                        </div>
                        <div className="category-name text-left">
                            {props.postData.cType}
                        </div>
                        <div className="suwasewana">
                            SPEEDLANKA.COM
                        </div>
                        <div className="posted-date">
                            Posted on {props.postData.date} / {props.postData.location}
                        </div>
                        <div className="desc">
                            {props.postData.desc}
                        </div>
                        <div className="seller-name">
                            by {props.postData.sellerName}
                        </div>
                        <div className="seller-status">
                            seller {props.postData.sellerVerified}
                        </div>
                        {/*<div className="attribute-list">*/}
                        {/*    <div className="attribute-item">*/}
                        {/*        Bike Type: Motorbikes*/}
                        {/*    </div>*/}
                        {/*    <div className="attribute-item">*/}
                        {/*        Bike Type: Motorbikes*/}
                        {/*    </div>*/}
                        {/*    <div className="attribute-item">*/}
                        {/*        Bike Type: Motorbikes*/}
                        {/*    </div>*/}
                        {/*    <div className="attribute-item">*/}
                        {/*        Bike Type: Motorbikes*/}
                        {/*    </div>*/}
                        {/*    */}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdsPostItem;