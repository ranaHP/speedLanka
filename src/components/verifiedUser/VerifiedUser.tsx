import React from "react";
import {Shield, ShieldOff} from "react-feather";
type VarifiedUserProps = {
    approved: string
}
const VerifiedUser:React.FC<VarifiedUserProps> = (props) => {
    return (
        <div className="verify-status">
            Verified Seller { props.approved === "approved" ? <Shield size={18}/> :  <ShieldOff size={18}/>}
        </div>
    );
}

export default VerifiedUser;