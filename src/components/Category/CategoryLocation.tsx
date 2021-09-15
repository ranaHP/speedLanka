import React, {useState, useEffect} from 'react'
import { Card, ListGroup, Row} from "react-bootstrap";
import { ILocation} from "../../types/MainTypes";
import LocationSelector from "../subComponenets/locationSelector/LocationSelector";

type  CategoryProps = {
    componentType: string
    setLocationFilter: (location: ILocation | null ) => void
}

const CategoryLocation: React.FC<CategoryProps> = (props) => {
    const [location, setLocation] = useState<ILocation | null>( null);
    const [currentLocation, setCurrentLocation] = useState<string>( "All Island");

    const handleOnLocationChange = (location : ILocation | null ) => {
        setLocation(location);
    }
    const handleOnGetLocationString = ( ) => {
        if(!location){
            setCurrentLocation("All Island");
            return;
        }
        if(location.province == ""){
            setCurrentLocation("All Island");
            return;
        }
        if(location.distrisct == ""){
            setCurrentLocation(location.province);
            return;
        }
        if(location.city == ""){
            setCurrentLocation(location.province + '/' + location.distrisct);
            return;
        }
        if(location.city != ""){
            setCurrentLocation(location.province + '/' + location.distrisct + '/' + location.city);
            return;
        }
    }
    useEffect(() => {
        handleOnGetLocationString();
        props.setLocationFilter(location);
    }, [location]);

    return (
        <Row className={" p-0 m-0 category-items-container"} >
            <div className="category pt-3">
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="title">
                            Search By Location
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <div className="category-items-container">
                                {props.componentType === "2" &&
                                    <LocationSelector setLocationFilter={handleOnLocationChange} />
                                }
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item >
                            {
                                currentLocation
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </Row>
    )
}
export default CategoryLocation;