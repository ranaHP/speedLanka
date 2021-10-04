import React from 'react';
import {Button, Image} from "react-bootstrap";
import PostImage from '../../../asset/images/postItem/banner1.jpg';
import {IFormDataResponse} from "../../../types/MainTypes";
import UserPostPopup from "../../userPostPopup/UserPostPopup";
import {Bookmark, Calendar, MapPin} from "react-feather";

type HomePostItemProps = {
    postData: IFormDataResponse

}
const HomePostItem : React.FC<HomePostItemProps> = ( props ) => {
    const [modalPostPopupShow, setModalPostPopupShow] = React.useState(false);

    return (
        <div className="home-post-item-home-container">
            <UserPostPopup onHide={() => {
                setModalPostPopupShow(false)
            }} show={modalPostPopupShow} postData={props.postData}/>
            <div className="home-post-item-home">
                <div className="image">
                    <Image src={PostImage} width="100%"/>
                </div>
                <div className="home-user-text-content">
                    <Button className="btn btn-danger view-more-btn" onClick={() => {
                        setModalPostPopupShow(true)
                    }}> View Post</Button>
                    <div className="home-user-text-content-title">
                        {props.postData.title}
                    </div>
                    <div className="category-name">
                       <Bookmark size={13} /> {props.postData.cType}
                    </div>
                    <div className="suwasewana">
                       SUWASEWANA.COM
                    </div>
                    <div className="posted-date">
                        Posted on <Calendar size={13} />  {props.postData.date}  <MapPin size={13}></MapPin> {props.postData.location}
                    </div>
                    <div className="desc">
                        {props.postData.desc}Vehicle description means a description of a vehicle including at a minimum the license information,
                    </div>
                    <div className="seller-name">
                        by {props.postData.sellerName}
                    </div>
                    {/*<div className="seller-status">*/}
                    {/*    seller {props.postData.sellerVerified}*/}
                    {/*</div>*/}
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
    )
}
export default HomePostItem;