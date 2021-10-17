import React from 'react';
import {MapPin} from "react-feather";
import {IWeddingResponse} from "../../../types/MainTypes";

type WeddingProfileCardProps = {
    WeddingPost: IWeddingResponse
}
const WeddingProfileCard: React.FC<WeddingProfileCardProps> = (props) => {
    return (
        <div className="profile-card-4-container m-2">
            <div className="profile-card-4 text-center">
                <img
                    src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-4.jpg"
                    className="img img-responsive"/>
                <div className="profile-content">
                    <div className="profile-name">{props.WeddingPost.fname}
                        <p><MapPin size={15}/> {props.WeddingPost.location}</p>
                    </div>

                    <div className="row">
                        <div className="col-xs-4">
                            <div className="profile-overview">
                                <p>Looking</p>
                                <h5> {props.WeddingPost.gender == "male" ? "Female" : "Male"}</h5></div>
                        </div>
                        <div className="col-xs-4">
                            <div className="profile-overview">
                                <p>Age</p>
                                <h5>{props.WeddingPost.age}</h5></div>
                        </div>

                        <div className="col-xs-4">
                            <div className="profile-overview">
                                <p>Religion</p>
                                <h5>{props.WeddingPost.religion}</h5></div>
                        </div>
                        <div className="col-xs-4">
                            <div className="profile-overview">
                                <p>Lagnaya</p>
                                <h5>{props.WeddingPost.lagnaya}</h5></div>
                        </div>
                    </div>
                    {/*<div className="profile-description">*/}

                    {/*    {props.WeddingPost.desc}*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}
export default WeddingProfileCard;