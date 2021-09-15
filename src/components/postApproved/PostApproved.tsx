import React from "react";
import {AlertTriangle, CheckCircle, Shield, ShieldOff} from "react-feather";
type VarifiedUserProps = {
    approved: string
}
const PostApproved:React.FC<VarifiedUserProps> = (props) => {
    return (
        <div className="verify-status">
            Post Status: { props.approved === "not" ? <><AlertTriangle size={18}/> pending..</> :  <CheckCircle size={18}/>}
        </div>
    );
}

export default PostApproved;