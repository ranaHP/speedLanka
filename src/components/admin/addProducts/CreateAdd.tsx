import React from 'react';
import PageTitle from "../pageTitle/PageTitle";
import ProductForm from "../productForm/ProductForm";

const CreateAdd: React.FC = () => {
    return (
        <React.Fragment>
            <PageTitle title={"Post Advertisement "} subTitle={"SpeedLanka"}/>
            <ProductForm/>
        </React.Fragment>
    );
};

export default CreateAdd;