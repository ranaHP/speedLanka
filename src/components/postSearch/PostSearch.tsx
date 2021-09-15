import React, {useState} from "react";
import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import {IOption} from "../../types/MainTypes";
import Select from "react-select";

type PostSearchProps = {
    searchChange: (name: string) => void
    searchResultCount: number
}

const PostSearch : React.FC<PostSearchProps> = ( props ) => {
    const [searchItem, setSearchItem] = useState<string>("");
    return (
        <Row className={"p-0 m-0 search-post-container"}>
            <div className="search-post">
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>

                            <div className="search-wrapper">
                                <div style={{width: "95%", paddingRight: "15px"}}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="What are you looking for ?"
                                            onChange={ e => {
                                                setSearchItem(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                </div>

                                <Button className="searchBTN" onClick={ () => {
                                    props.searchChange(searchItem);
                                }}>
                                    Search
                                </Button>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Search result: {props.searchResultCount}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </Row>
    );
}
export default PostSearch;