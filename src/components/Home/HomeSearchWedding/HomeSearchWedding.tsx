import React from 'react';
import Select from 'react-select';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import HomeItemTitle from "../HomeItemTitle/HomeItemTitle";
export const options = [
    { value: 'southern', label: 'southern' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const HomeSearchWedding: React.FC = () => {


    return (
        <>

            <HomeItemTitle title={"Wedding Ads"} sub_title={"SpeedLanka.lk"}/>
            <div className="home-search">
                <div className="user-product-search">
                    {/*<Select options={options} />*/}

                   <div className="item">
                       <div className="item-label">
                           Province
                       </div>
                       <Select
                           className="basic-single"
                           classNamePrefix="select"
                           defaultValue={options[0]}
                           isDisabled={false}
                           isLoading={true}
                           isClearable={true}
                           isSearchable={true}
                           name="color"
                           options={options}
                       />
                   </div>

                    <div className="item">
                        <div className="item-label">
                            Job
                        </div>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={options[0]}
                            isDisabled={false}
                            isLoading={true}
                            isClearable={true}
                            isSearchable={true}
                            name="color"
                            options={options}
                        />
                    </div>

                    <div className="item">
                        <div className="item-label">
                            Gender
                        </div>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={options[0]}
                            isDisabled={false}
                            isLoading={true}
                            isClearable={true}
                            isSearchable={true}
                            name="color"
                            options={options}
                        />
                    </div>

                    <div className="item">
                        <Button className="user-search-btn">Search</Button>
                    </div>
                </div>
            </div>

        </>

    )
}
export default HomeSearchWedding;