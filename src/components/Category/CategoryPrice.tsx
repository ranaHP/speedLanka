import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import {Accordion, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';


type  CategoryPriceProps = {
    // componentType: string
    changeMaxPrice: (maxPrice : number) => void
    maxPrice: number

}

const CategoryPrice: React.FC<CategoryPriceProps> = (props) => {
    const [maxValue, setMaxValue] = useState<number>(20000);
    const [minValue, setMinValue] = useState<number>(1);
    const [currentValue, setCurrent] = useState<number>((maxValue+minValue)/2);

    useEffect(() => {
        props.changeMaxPrice(currentValue);
        setMaxValue(props.maxPrice);
    }, [currentValue]);


    return (
        <Row className={" p-0 m-0 category-items-container"}>
            <div className="category pt-3">
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="title">
                            Search By Price
                        </ListGroup.Item>

                        <ListGroup.Item>

                            <RangeSlider
                                value={currentValue}
                                onChange={e => setCurrent(Number(e.target.value))}
                                min={minValue}
                                max={maxValue + 1000 }
                            />

                        </ListGroup.Item>
                        <ListGroup.Item>
                            Current Max Price: Rs{currentValue}.00
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </Row>
    )
}
export default CategoryPrice;