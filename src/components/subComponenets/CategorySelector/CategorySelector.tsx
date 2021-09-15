import React, {useEffect, useState} from "react";
import Select, {ValueType} from "react-select";
import {ICategory, ICategoryOption, ILocation, IOption} from "../../../types/MainTypes";
import {categoryType} from "../../../config/postCategory";

let options: IOption[] = []

type  CategorySelectorProps = {
    setCategoryFilter: (category: ICategoryOption | null ) => void
}

const CategorySelector: React.FC<CategorySelectorProps> = (props ) => {
    const [optionsList, setOptionsList] = useState<IOption []>(options);
    const [currentSelect, setCurrentSelect] = useState<string | null>("All Category");

    const handleOnAddCategoryOption = () => {
        const _optionList = optionsList.slice();
        categoryType.map((category:ICategory) => {
            const item: string = category.name ;
            _optionList.push({value: "p/"+item, label: item})
            category.subCategory.map((subCategory) => {
                const item: string = category.name + "/" + subCategory.name;
                _optionList.push({value: "p+s/"+item, label: item})
            })
        })
        setOptionsList(_optionList);
    }

    useEffect(() => {
        handleOnAddCategoryOption();
    },[]);

    return (
        <div style={{zIndex: 100}} key={"ss222"} >
            <Select
                key={"ss222322"}
                placeholder={"All Category"}
                isSearchable
                options={optionsList}
                isClearable
                onChange={ (option: ValueType<IOption, false>) => {
                    setCurrentSelect(option ? option.label : "")    ;
                    if(option) {
                        const category = option.value.split("/");
                        console.log(category);
                        props.setCategoryFilter({
                            name: category[1] ? category[1] : "" ,
                            subCategory: category[2] ? category[2] : ""
                        });
                    }else {
                        setCurrentSelect("All Sri Lanka")
                        props.setCategoryFilter(null);
                    }
                }}
            />
        </div>
    )
}

export  default CategorySelector;