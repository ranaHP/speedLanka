import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {Accordion, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import {ICategory, ICategoryOption, ILocation, IOption} from "../../types/MainTypes";
import CategorySelector from "../subComponenets/CategorySelector/CategorySelector";
let options: ICategoryOption[] = [];

type  CategoryPriceProps = {
    setCategoryFilter: (category: ICategoryOption | null ) => void
}

const CategoryType: React.FC<CategoryPriceProps> = (props) => {
    const [currentCategory, setCurrentCategory] = useState<string>("All Category");
    const [currentCategoryObj, setCurrentCategoryObj] = useState<ICategoryOption | null>(null);

    const handleOnCategoryChange = (category : ICategoryOption | null ) => {
        setCurrentCategoryObj(category);
        if(!category){
            setCurrentCategory("All Category");
            return;
        }
        if(category.name == ""){
            setCurrentCategory("All Category");
            return;
        }
        if(category.subCategory == ""){
            setCurrentCategory(category.name);
            return;
        }
        if(category.subCategory != ""){
            setCurrentCategory(category.name + "/" + category.subCategory);
            return;
        }
    }

    useEffect(() => {
        props.setCategoryFilter(currentCategoryObj);
    }, [currentCategory]);

    return (
        <Row className={" p-0 m-0 category-items-container"}>
            <div className="category pt-3">
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="title">
                            Search By Product
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <CategorySelector setCategoryFilter={handleOnCategoryChange}  />

                        </ListGroup.Item>
                        <ListGroup.Item>
                            {currentCategory}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </Row>
    )
}
export default CategoryType;