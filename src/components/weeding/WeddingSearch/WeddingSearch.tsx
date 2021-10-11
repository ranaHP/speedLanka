import React, {useEffect, useState} from 'react';
import Select, {ValueType} from 'react-select';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import UserLocationSearch from "../../userSearchLocation/UserLocationSearch";
import UserCategorySearch from "../../userSearchCategory/UserCategorySearch";
import HomeItemTitle from "../../Home/HomeItemTitle/HomeItemTitle";
import {IOption} from "../../../types/MainTypes";
import {
    optionsAgeStart,
    optionsAgeTo,
    optionsGender,
    optionsJob,
    optionsLanguage,
    optionsReligion
} from "../../../config/wedding";

type WeddingSearchProps =  {
    onSearch: (looking :string, ageStart: number , ageTo: number  , religion:string , motherTongue:string , job:string) => void
}
const WeddingSearch: React.FC<WeddingSearchProps> = (props) => {
    const [looking, setLooking] = useState<string>("");
    const [ageStart, setAgeStart] = useState<string>("");
    const [ageTo, setAgeTo] = useState<string>("");
    const [religion, setReligion] = useState<string>("");
    const [motherTongue, setMotherTongue] = useState<string>("");
    const [job, setJob] = useState<string>("");

    const setAgeStartOption = () => {
        for(let i = 18 ;i < 75; i++){
            let temp:IOption = {
                value: i.toString(),
                label:i.toString()
            }
            optionsAgeStart.push(temp);
        }
    }
    const setAgeEndOption = () => {
        for (let i = 18; i < 75; i++) {
            let temp: IOption = {
                value: i.toString(),
                label: i.toString()
            }
            optionsAgeTo.push(temp);
        }
    }
    setAgeStartOption();
    setAgeEndOption();

    useEffect(() => {
        console.log(looking , ageStart , ageTo , religion , motherTongue , job)
    }, [looking , ageStart , ageTo , religion , motherTongue , job]);

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            // color: state.isSelected ? 'red' : 'blue',
            // color: 'rgba(252, 204, 26, 0.06)',
            height: "48px"
        }),
        // control: () => ({
        //     // none of react-select's styles are passed to <Control />
        // }),
        singleValue: (provided:any, state :any) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            return { ...provided, opacity, transition };
        }
    }
    return (
        <>
            <HomeItemTitle title={"Find Matching Partner"} sub_title={"SpeedLanka.lk"}/>
            <div className="wedding-home-search">
                <div className="user-product-search">
                   
                    <div className="item">
                        <div className="item-label">
                            Seeking
                        </div>
                        <Select
                            options={optionsGender}
                            styles={customStyles}
                            isClearable={true}
                            isSearchable={true}
                            onChange={ (e:ValueType<IOption, false>) => {
                                if(!e){
                                    setLooking("");
                                    return
                                }
                                setLooking(e.value);
                            }}
                        />
                    </div>


                    <div className="item">
                        <div className="item-label">
                            Age (From)
                        </div>
                        <Select
                            options={optionsAgeStart}
                            styles={customStyles}
                            isClearable={true}
                            isSearchable={true}
                            onChange={ (e: any) => {
                                if(!e){
                                    setAgeStart("");
                                    return
                                }
                                setAgeStart(e.value);
                            }}
                            defaultValue={{label: "18" ,value: "18"}}
                        />
                    </div>

                    <div className="item">
                        <div className="item-label">
                            Age (To)
                        </div>
                        <Select
                            options={optionsAgeTo}
                            styles={customStyles}
                            isClearable={true}
                            isSearchable={true}
                            onChange={ (e: any) => {
                                if(!e){
                                    setAgeTo("");
                                    return
                                }
                                setAgeTo(e.value);
                            }}
                            defaultValue={{label: "75" ,value: "75"}}
                        />
                    </div>


                    <div className="item">
                        <div className="item-label">
                             Religion
                        </div>
                        <Select
                            options={optionsReligion}
                            styles={customStyles}
                            isClearable={true}
                            isSearchable={true}
                            onChange={ (e: any) => {
                                if(!e){
                                    setReligion("");
                                    return
                                }
                                setReligion(e.value);
                            }}
                        />
                    </div>



                    <div className="item">
                        <div className="item-label">
                           Mother Tongue
                        </div>
                        <Select
                            options={optionsLanguage}
                            styles={customStyles}
                            isClearable={true}
                            isSearchable={true}
                            onChange={ (e: any) => {
                                if(!e){
                                    setMotherTongue("");
                                    return
                                }
                                setMotherTongue(e.value);
                            }}
                        />
                    </div>

                    <div className="item">
                        <div className="item-label">
                            Job
                        </div>
                        <Select
                            options={optionsJob}
                            styles={customStyles}
                            isClearable={true}
                            isSearchable={true}
                            onChange={ (e: any) => {
                                if(!e){
                                    setJob("");
                                    return
                                }
                                setJob(e.value);
                            }}
                        />
                    </div>

                    <div className="item">
                        <Button onClick={ () => {
                            props.onSearch(looking , Number(ageStart) , Number(ageTo) , religion , motherTongue , job);
                        }} className="user-search-btn">Search</Button>
                    </div>
                </div>
            </div>

        </>

    )
}
export default WeddingSearch;