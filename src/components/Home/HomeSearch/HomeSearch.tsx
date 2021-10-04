import React, {useState} from 'react';
import Select from 'react-select';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import HomeItemTitle from "../HomeItemTitle/HomeItemTitle";
import UserLocationSearch from "../../userSearchLocation/UserLocationSearch";
import UserCategorySearch from "../../userSearchCategory/UserCategorySearch";
type HomeSearchProps =  {
    onSearch: (primaryC: string, secondaryC: string ,province: string, district: string, city: string , name:string) => void
}
const HomeSearch: React.FC<HomeSearchProps> = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            // color: state.isSelected ? 'red' : 'blue',
            // color: 'rgba(252, 204, 26, 0.06)',
            height: "48px!important"
        }),
        // control: () => ({
        //     // none of react-select's styles are passed to <Control />
        //     width: 200,
        // }),
        singleValue: (provided:any, state :any) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        }
    }
    const [primaryType, setPrimaryType] = useState<string>("");
    const [secondaryType, setSecondaryType] = useState<string>("All categories");
    const [province, setProvince] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [city, setCity] = useState<string>("All Island");
    const [modalShowCategory, setModalShowCategory] = useState(false);
    const [modelShowLocation, setModelShowLocation] = useState(false);
    const handleOnCategoryChange = (primaryC: string, secondaryC: string) => {
        setPrimaryType(primaryC);
        setSecondaryType(secondaryC);
    }
    const handleOnLocationChange = (province: string, district: string, city: string) => {
        setCity(city);
        setDistrict(district);
        setProvince(province);
    }


    return (
        <>

            <UserLocationSearch show={modelShowLocation} onHide={() => {
                setModelShowLocation(false)
            }}
                                onChange={handleOnLocationChange}/>
            <UserCategorySearch
                onChange={handleOnCategoryChange}
                show={modalShowCategory}
                onHide={() => {
                    setModalShowCategory(false)
                }}/>

            <HomeItemTitle title={"Search Products"} sub_title={"SpeedLanka.lk"}/>
            <div className="home-search">
                <div className="user-product-search">
                    {/*<Select options={options} />*/}
                    <div className="item">
                        <div className="item-label">
                            Location
                        </div>
                        <div  className="item-btn" onClick={() => setModelShowLocation(true)} >
                            {city == "" ? "All Island" : city}
                        </div>
                    </div>

                    <div className="item">
                        <div className="item-label">
                            Category
                        </div>
                       <div className="item-btn"  onClick={() => setModalShowCategory(true)} >
                           {secondaryType == "" ? "All Category" : secondaryType }
                       </div>
                    </div>
                    <div className=" item">
                        <div className="item-label ">
                            Name
                        </div>
                        <Form.Control className="inputField " onChange={ (e) => {
                            setName(e.target.value);
                        }}  type="text" placeholder="Product" />
                    </div>
                    <div className="item">
                        <Button onClick={ () => {
                            props.onSearch(primaryType, secondaryType , province, district, city , name);
                        }} className="user-search-btn">Search</Button>
                    </div>
                </div>
            </div>

        </>

    )
}
export default HomeSearch;