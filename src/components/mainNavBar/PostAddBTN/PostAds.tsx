import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const PostAds : React.FC = () => {
    const history = useHistory();
    return (
        <Navbar.Brand className="logout-btn ">
                <Button onClick={() => {
                    history.push("/login")
                }} >
                    Post Ads
                </Button>
        </Navbar.Brand>
          
    );
}
export default PostAds;