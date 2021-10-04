import React from 'react';
import {Button, Image} from "react-bootstrap";
import PostImage from '../../../asset/images/postItem/Image 21.png';

const WeddingPostItem : React.FC = ( ) => {
    return (
        <div className="home-post-item-container">
            <div className="home-post-item">
                <div className="image">
                    <Image src={PostImage} width="100%"/>
                </div>
                <div className="home-user-text-content">
                    <Button className="btn btn-danger view-more-btn" > View Product</Button>
                    <div className="home-user-text-content-title">
                        නිවසේ සිට ප්‍රතිකාර ලබාගන්නා කොවිඩ්
                        රෝගියෙකු, වහාම රෝහල්ගත කළ යුතු
                        අවස්ථාව ගැන ඔබ දැනුවත්ද?
                    </div>
                    <div className="suwasewana">
                        SUWASEWANA.COM
                    </div>
                    <div className="posted-date">
                        15/15/2021
                    </div>
                    <div className="desc">
                        නිවසේ සිට ප්‍රතිකාර ලබාගන්නා කොවිඩ්
                        රෝගියෙකු, වහාම රෝහල්ගත කළ යුතු
                        අවස්ථාව ගැන ඔබ දැනුවත්ද?
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeddingPostItem;