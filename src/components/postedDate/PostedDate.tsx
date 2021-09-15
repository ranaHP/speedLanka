import React from "react";
import {Shield, ShieldOff} from "react-feather";
type PostedDateProps = {
    date: string
}
const PostedDate:React.FC<PostedDateProps> = (props) => {
    return (
        <div className="postedDate">
            Posted date:{ props.date}
        </div>
    );
}

export default PostedDate;