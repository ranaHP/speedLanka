import React, {useEffect, useState} from 'react';
import {Button, Col, Modal, Row} from "react-bootstrap";
import {ICategory} from "../../types/MainTypes";
import {categoryType} from "../../config/postCategory";

type UserCategorySearchProps = {
    show: boolean
    onHide: () => void
    onChange: (primaryC: string, secondaryC: string) => void
}
const UserCategorySearch: React.FC<UserCategorySearchProps> = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [primaryCategory, setPrimaryCategory] = useState<string>("");
    const [secondaryCategory, setSecondaryCategory] = useState<string>("");
    const [subCategory, setSubCategory] = useState<{ name: string }[] | null>(null);
    const handleOnPrimaryCategorySelect = (PCategoryDivId: string, categoryIndex: number) => {
        setSubCategory(categoryType[categoryIndex].subCategory)
        handleOnClickClassAdd(PCategoryDivId);
    }

    const handleOnClickClassAdd = (PCategoryDivId: string) => {

        categoryType.map((category: ICategory, index: number) => {
            if ( !document.getElementById("pCategory" + category.name) ) return;
            // @ts-ignore
            document.getElementById("pCategory" + category.name).style.backgroundColor = `white`;
        })
        if ( !document.getElementById(PCategoryDivId) ) return;
        // @ts-ignore
        document.getElementById(PCategoryDivId).style.backgroundColor = `rgba(252, 204, 26, 0.45)`;
    }

    const handleOnPrimaryUnSelect = () => {
        categoryType.map((category: ICategory, index: number) => {
            if ( !document.getElementById("pCategory" + category.name) ) return;
            // @ts-ignore
            document.getElementById("pCategory" + category.name).style.backgroundColor = `white`;
        })
    }
    // useEffect(() => {
    //     setPrimaryCategory("");
    //     setSecondaryCategory("");
    //     setSubCategory(null);
    // }, []);


    return (
        <div className="user-category-search-model">
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={props.show}
                onHide={props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Select Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="p-0 m-0">
                        <Col xs={6}>
                            <div onClick={() => {
                                setSecondaryCategory("");
                                setPrimaryCategory("");
                                props.onChange("" ,"");
                                props.onHide();
                                handleOnPrimaryUnSelect();
                            }} className="category-select-item ">
                                All Category
                            </div>
                            {
                                categoryType.map((category: ICategory, index: number) => {
                                    return (
                                        <>
                                            <div onClick={() => {
                                                handleOnPrimaryCategorySelect("pCategory" + category.name, index);
                                                setPrimaryCategory(category.name)
                                            }} id={"pCategory" + category.name} className="category-select-item ">
                                                {category.name}
                                            </div>

                                        </>

                                    )
                                })
                            }

                        </Col>
                        <Col xs={6}>
                            {subCategory &&
                                subCategory.map((subCategoryItem: { name: string }, index: number) => {
                                    return (
                                        <div onClick={() => {
                                            setSecondaryCategory(subCategoryItem.name);
                                            props.onChange(primaryCategory, subCategoryItem.name)
                                            props.onHide();
                                        }} className="category-select-item ">
                                            {subCategoryItem.name}
                                        </div>
                                    )
                                })
                            }
                            {subCategory && subCategory.length == 0 &&
                            <div onClick={ () => {
                                props.onChange(primaryCategory, "")
                            }} className="category-select-item "> no sub categories </div>
                            }
                        </Col>

                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
export default UserCategorySearch;