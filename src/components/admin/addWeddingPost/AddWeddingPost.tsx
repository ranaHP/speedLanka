import React from 'react';
import PageTitle from "../pageTitle/PageTitle";
import ProductForm from "../productForm/ProductForm";
import WeddingForm from "../WeddingForm/WeddingForm";

const AddWeddingPost: React.FC = () => {
    return (
        <React.Fragment>
            <PageTitle title={"Wedding Post"} subTitle={"SpeedLanka"}/>
            <WeddingForm/>
        </React.Fragment>
    );
};

export default AddWeddingPost;