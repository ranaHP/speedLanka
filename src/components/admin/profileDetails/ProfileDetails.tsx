import React from 'react';
import ProfileImage from "./ProfileImage";
import ProfileName from "./ProfileName";
import ProfileRoll from "./ProfileRoll";

const ProfileDetails: React.FC = () => {
    return (
        <React.Fragment>
            <ProfileImage/>
            <ProfileName/>
            <ProfileRoll/>
        </React.Fragment>
    );
};

export default ProfileDetails;