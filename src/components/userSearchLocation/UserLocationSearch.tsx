import React, {useEffect, useState} from 'react';
import {Button, Col, Modal, Row} from "react-bootstrap";
import {ICategory} from "../../types/MainTypes";
import {categoryType} from "../../config/postCategory";
import {IDistrict, IProvinceList, province_cities_district} from "../../config/province_cities_district";

type UserCategorySearchProps = {
    show: boolean
    onHide: () => void
    onChange: (province: string, district: string , city: string) => void
}
const UserLocationSearch: React.FC<UserCategorySearchProps> = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [districtList, setDistrictList] = useState<IDistrict[] | null >(null);
    const [citiesList, setCitiesList] = useState<string[] | null >(null);
    const [province, setProvince] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [district, setDistrict] = useState<string>("");

    const handleOnClickProvince= (provinceId: string) => {
        province_cities_district.map((province: IProvinceList, index: number) => {
            if ( !document.getElementById("province" + province.province) ) return;
            // @ts-ignore
            document.getElementById("province" + province.province).style.backgroundColor = `white`;

            province.districtList.map( (districtList : IDistrict) => {
                if ( !document.getElementById("district" + districtList.district) ) return;
                // @ts-ignore
                document.getElementById("district" + districtList.district).style.backgroundColor = `white`;
            })
        })
        if ( !document.getElementById("province" + provinceId) ) return;
        // @ts-ignore
        document.getElementById("province" + provinceId).style.backgroundColor = `rgba(252, 204, 26, 0.45)`;
    }

    const handleOnClearProvinceSelect = () => {
        province_cities_district.map((province: IProvinceList, index: number) => {
            if ( !document.getElementById("province" + province.province) ) return;
            // @ts-ignore
            document.getElementById("province" + province.province).style.backgroundColor = `white`;

            province.districtList.map( (districtList : IDistrict) => {
                if ( !document.getElementById("district" + districtList.district) ) return;
                // @ts-ignore
                document.getElementById("district" + districtList.district).style.backgroundColor = `white`;
            })
        })
    }
    const handleOnClickDistrict= (districtId: string) => {
        province_cities_district.map((province: IProvinceList, index: number) => {
            province.districtList.map( (districtList : IDistrict) => {
                if ( !document.getElementById("district" + districtList.district) ) return;
                // @ts-ignore
                document.getElementById("district" + districtList.district).style.backgroundColor = `white`;
            })
        })
        if ( !document.getElementById("district" + districtId) ) return;
        // @ts-ignore
        document.getElementById("district" + districtId).style.backgroundColor = `rgba(252, 204, 26, 0.45)`;
    }

    // useEffect(() => {
    //     setProvince("");
    //     setCity("")
    //     setDistrict("");
    //     setCitiesList(null);
    //     setDistrictList(null)
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

                        <Col xs={4}>
                            <div onClick={() => {
                                setProvince("");
                                setDistrict("");
                                setProvince("");
                                props.onChange("", "", "");

                                setDistrictList([]);
                                setCitiesList(null);
                                handleOnClearProvinceSelect()
                                props.onHide();
                            }} className="category-select-item ">
                                All Island
                            </div>
                            {
                                province_cities_district.map((province: IProvinceList, index: number) => {
                                    return (
                                        <>
                                            <div onClick={() => {
                                                setDistrictList(province.districtList);
                                                setCitiesList(null);
                                                setProvince(province.province);
                                                handleOnClickProvince(province.province);
                                            }} id={"province" + province.province} key={index + "province"} className="category-select-item ">
                                                {province.province}
                                            </div>

                                        </>

                                    )
                                })
                            }

                        </Col>

                        <Col xs={4}>
                            {districtList &&
                                districtList.map((district: IDistrict, index: number) => {
                                    return (
                                        <>
                                            <div onClick={() => {
                                                setCitiesList(district.cityList);
                                                handleOnClickDistrict(district.district);
                                                setDistrict(district.district);
                                            }} id={"district" + district.district} key={index + "distrinct"}   className="category-select-item ">
                                                {district.district}
                                            </div>

                                        </>

                                    )
                                })
                            }

                        </Col>

                        <Col xs={4}>
                            {citiesList &&
                            citiesList.map((city: string, index: number) => {
                                    return (
                                        <>
                                            <div onClick={() => {
                                                setCity(city);
                                                props.onChange( province, district,city);
                                                props.onHide();
                                            }} id={"city" + city} className="category-select-item " key={index + "city"} >
                                                {city}
                                            </div>

                                        </>

                                    )
                                })
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
export default UserLocationSearch;