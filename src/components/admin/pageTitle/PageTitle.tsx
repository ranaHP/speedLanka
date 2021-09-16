import React from 'react';

type PageTitleProps  = {
    title: String | null ,
    subTitle: String | null
}
const PageTitle: React.FC<PageTitleProps> = (props) => {
    return (
            <div className="page-title pb-3">
                <h3>{props.title} </h3>
                <span className="sub-title"> {props.subTitle} </span>
            </div>


    );
};

export default PageTitle;