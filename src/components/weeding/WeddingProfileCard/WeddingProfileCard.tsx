import React from 'react';
import {MapPin} from "react-feather";

const WeddingProfileCard : React.FC = ( ) => {
    return (
        <div className="col-md-3 col-sm-3 col-xs-10" >
                <div className="profile-card-4 text-center">
                    <img
                    src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-4.jpg"
                    className="img img-responsive"/>
                    <div className="profile-content">
                        <div className="profile-name">Avishka Rathnayake
                            <p><MapPin size={15} /> Akuressa</p>
                        </div>
                        <div className="profile-description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                            sed diam nonumy eirmod tempor.
                        </div>
                        <div className="row">
                            <div className="col-xs-4">
                                <div className="profile-overview">
                                    <p>TWEETS</p>
                                    <h4>1300</h4></div>
                            </div>
                            <div className="col-xs-4">
                                <div className="profile-overview">
                                    <p>FOLLOWERS</p>
                                    <h4>250</h4></div>
                            </div>
                            <div className="col-xs-4">
                                <div className="profile-overview">
                                    <p>FOLLOWING</p>
                                    <h4>168</h4></div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default WeddingProfileCard;