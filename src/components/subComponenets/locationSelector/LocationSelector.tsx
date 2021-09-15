import React, {useEffect, useState} from "react";
import Select, {ValueType} from "react-select";
import {ILocation, IOption} from "../../../types/MainTypes";
import {province_cities_district} from "../../../config/province_cities_district";

let options: IOption[] = []

type  LocationSelectorProps = {
    setLocationFilter: (location: ILocation | null ) => void
}

const LocationSelector: React.FC<LocationSelectorProps> = ( props ) => {
    const [optionsList, setOptionsList] = useState<IOption []>(options);
    const [currentSelect, setCurrentSelect] = useState<string | null>("All Sri Lanka");
    const handleOnAddOption = () => {
        const _optionList = optionsList.slice();
        province_cities_district.map((province) => {
            const item: string = province.province ;
            _optionList.push({value: "p/"+item, label: item})
            province.districtList.map((district) => {
                const item: string = province.province + "/" + district.district;
                _optionList.push({value: "p+d/"+item, label: item})
                district.cityList.map((city) => {
                    const item: string = province.province + "/" + district.district + "/" + city;
                    _optionList.push({value: "p+s+c/"+item, label: item})
                })
            })
        })
        setOptionsList(_optionList);
    }

    useEffect(() => {
        handleOnAddOption();
    },[]);

    return (
        <Select
            placeholder={"All Sri Lanka"}
            isSearchable
            options={optionsList}
            isClearable
            onChange={ (option: ValueType<IOption, false>) => {
                setCurrentSelect(option ? option.label : "")    ;
                if(option) {
                    const location = option.value.split("/");
                    props.setLocationFilter({
                        province: location[1] ? location[1] : "",
                        distrisct: location[2] ? location[2] : "",
                        city: location[3] ? location[3] : ""
                    });
                }else {
                    setCurrentSelect("All Sri Lanka")
                    props.setLocationFilter(null);
                }
            }}
        />
    )
}

export  default LocationSelector;