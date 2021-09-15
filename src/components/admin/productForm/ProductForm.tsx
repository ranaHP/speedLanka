import React, { useEffect,  useState} from 'react';
import {Alert, Button, Col, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import {
    IAttribute,
    ICategory,
    ICategoryOption,
    IFormData,
    IFormGroup,
    ILocation,
    IOption
} from "../../../types/MainTypes";
import {Electronic} from "../../../config/attributeType";
import PostItem from "../../Post/PostItem";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducers";
import {updateTempPost} from "../../../store/actions/TempPostItem";
import jwt_decode from "jwt-decode";
import {IloginDetails} from "../../../store/Interfaces/inteface";
import {alertSystemAction} from "../../../store/actions/AlertSystem";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {categoryType} from "../../../config/postCategory";
import {province_cities_district} from "../../../config/province_cities_district";
import {useMutation} from "@apollo/client";
import {CREATE_POST} from "../../../api/user/mutations";
const options: IOption[] = [
]

const ProductForm: React.FC = () => {
    const {register, handleSubmit, watch, reset ,control, formState: {errors}} = useForm();
    const [attributeList, setAttributeList] = useState<IAttribute [] | null>(Electronic);
    const [attributeName, setAttributeName] = useState<string>("");
    const [attributeDesc, setAttributeDesc] = useState<string>("");
    const [attributeError, setAttributeError] = useState<Boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const loginDetail: {loginDetails:string} = useSelector((state: RootState) => state.loginReducer);
    const [categoryOptionsList, setCategoryOptionsList] = useState<IOption []>(options);
    const [LocationOptionsList, setLocationOptionsList] = useState<IOption []>(options);
    const [createPostMutation, { data, loading, error}] = useMutation(CREATE_POST);
    const [loginDetailsDecodes, setLoginDetailsDecodes] = useState<IloginDetails[] | null>( null);
    const [isPostItem, setIsPostItem] = useState(false);
    const handleOnAddAttribute = (name: String, desc: String) => {
        if (!name || !desc) {
            setAttributeError(true);
            return;
        } else {
            if (!attributeList) {

                setAttributeList([{name: name, desc: desc}]);
            } else {
                setAttributeError(false);
                const asttriList: IAttribute [] = attributeList.slice();
                asttriList.push({name: name, desc: desc});
                setAttributeList(asttriList);
            }
            setAttributeName("");
            setAttributeDesc("");
        }
    }

    useEffect(() => {
        setLoginDetailsDecodes(jwt_decode(String(loginDetail.loginDetails ? loginDetail.loginDetails : "")));
        // setLoginDetailsDecodes(jwt_decode(loginDetail.loginDetails));
    }, [loginDetail]);

    const dispatch = useDispatch();
    const createProductTypeOptions = ( ) => {
        const _optionList = categoryOptionsList.slice();
        categoryType.map((category:ICategory) => {
            category.subCategory.map((subCategory) => {
                const item: string = category.name + "/" + subCategory.name;
                _optionList.push({value: "p+s/"+item, label: item})
            })
        });
        setCategoryOptionsList(_optionList);
    }
    const createLocationTypeOptions = ( ) => {
        const _optionList = LocationOptionsList.slice();
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
        setLocationOptionsList(_optionList);
    }
    const onSubmit = async (formData: any) => {
        
        
        try {
            const data = new Date();
            const newPost = await createPostMutation({
                variables: {
                    _id: String(formData.title+ formData.sContact + Math.floor(Math.random() * 100000)),
                    cType: formData.categoryType.label,
                    location: formData.locationType.label,
                    title: formData.title,
                    price: formData.price,
                    desc: formData.desc,
                    displayNumber: formData.sContact,
                    sellerName: loginDetailsDecodes ? loginDetailsDecodes[0].name : "temp..",
                    sellerContact: loginDetailsDecodes ? loginDetailsDecodes[0].contact : "temp..",
                    images: "https://cdn.alzashop.com/ImgW.ashx?fd=f16&cd=MCS252c0a",
                    approved: "not",
                    date: data.getDate(),
                    sellerVerified: loginDetailsDecodes ? loginDetailsDecodes[0].status : "temp..",
                    attribute: JSON.stringify(attributeList)
                }
            });
        } catch (e) {
            // console.log(e);
            setErrorMessage("This mobile number already used!");
            toast.error('Registration invalid! \n This mobile number already used!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            if (error) {
                setErrorMessage("This mobile number already used! !");
            }
            ;
        }
        // console.log({
        //     "_id":String(formData.title+ formData.sContact + Math.floor(Math.random() * 100000)),
        //     "cType": formData.categoryType.label,
        //     "location": formData.locationType.label,
        //     "title": formData.title,
        //     "price": formData.price,
        //     "desc": formData.desc,
        //     "attribute": JSON.stringify(attributeList),
        //     "displayNumber": formData.sContact,
        //     "sellerName": loginDetailsDecodes ? loginDetailsDecodes[0].name : "trmp..",
        //     "sellerContact": loginDetailsDecodes ? loginDetailsDecodes[0].contact : "temp...",
        //     "images": "https://cdn.alzashop.com/ImgW.ashx?fd=f16&cd=MCS252c0a",
        //     "approved": "not",
        //     "date": Date(),
        //     "sellerVerified": loginDetailsDecodes ? loginDetailsDecodes[0].status : "temp..."
        // });
        setTimeout(() => {
           reset();
           setAttributeList(null);
        }, 1000)
        toast.success('Post Successfully Added!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    useEffect(() => {
        if(!watch('title')) return;
        dispatch(updateTempPost({
            title: watch('title'),
            _id: "",
            cType: watch("categoryType") ? watch("categoryType").label : "temp...",
            sellerName: loginDetailsDecodes ? loginDetailsDecodes[0].name : "temp..",
            attribute: attributeList ? attributeList : [],
            date: Date(),
            price: watch('price'),
            approved: "approved",
            sellerVerified: loginDetailsDecodes ? loginDetailsDecodes[0].status : "temp...",
            desc: watch("desc"),
            location: watch("locationType") ? watch("locationType").label : "temp...",
            displayNumber: watch("sContact"),
            images: "https://cdn.alzashop.com/ImgW.ashx?fd=f16&cd=MCS252c0a",
            sellerContact: loginDetailsDecodes ? loginDetailsDecodes[0].contact : "temp..."
        }));
        setIsPostItem(true);


    }, [attributeList, watch('title'), watch('price'), watch('desc'), watch('sContact') ,  watch("locationType") , watch("categoryType")]);

    useEffect(() => {
        createProductTypeOptions();
        createLocationTypeOptions();
    }, []);

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="p-5">
            <ToastContainer/>
            <Row>
                {isPostItem &&
                <PostItem componentType={"3"}/>
                }

            </Row>
            <Row>
                <Form.Group className="mb-3 col-12">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="string" placeholder="" {...register("title", {
                        required: true,
                    })}/>
                    {errors.title  && <Form.Text className="text-danger "> required </Form.Text>}

                </Form.Group>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-2">
                    <Form.Label> Category </Form.Label>
                    <Controller
                        name="categoryType"
                        control={control}
                        render={({field}) => <Select
                            isClearable
                            isSearchable
                            {...field}
                            options={categoryOptionsList}
                        />}
                    />
                    {watch("categoryType") == null && <Form.Text className="text-danger "> required </Form.Text>}
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-2">
                    <Form.Label> Location </Form.Label>
                    <Controller
                        name="locationType"
                        control={control}
                        render={({field}) => <Select
                            isClearable
                            isSearchable
                            {...field}
                            options={LocationOptionsList}
                        />}
                    />
                    {watch("locationType") == null && <Form.Text className="text-danger "> required </Form.Text>}
                </Col>


                <Form.Group className="mb-3 col-12">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number"  {...register("price", {
                        required: true,
                    })}
                    />

                    {errors.price && <Form.Text className="text-danger "> required </Form.Text>}

                </Form.Group>
                <Form.Group className="mb-3 col-12">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as={"textarea"}  {...register("desc", {
                        required: true,
                    })}/>
                    {errors.desc && <Form.Text className="text-danger "> required </Form.Text>}

                </Form.Group>
                <Row>
                    <div className="attribute_container">
                        <Row className={"pb-3 border-bottom"}>
                            {
                                attributeList?.map((attribute: IAttribute, index: number) => {
                                    return (<Col xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
                                        <Form.Group >
                                            <Form.Label> {attribute.name} </Form.Label>
                                            <Form.Control
                                                type="text"
                                                style={{border: attributeError ? "1px soild red" : "0px soild red"}}
                                                onChange={(e) => {
                                                    if (attributeList) {
                                                        const attList = attributeList.slice();
                                                        attList[index].desc = e.target.value;
                                                        setAttributeList(attList);

                                                    }
                                                }}
                                                required
                                                value={String(attributeList[index].desc)}
                                            />
                                        </Form.Group>
                                    </Col>)
                                })
                            }
                        </Row>

                        <Row className="py-3">
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Form.Group>
                                    <Form.Label> Attribute Name </Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{border: attributeError ? "1px soild red" : "0px soild red"}}
                                        onChange={(e) => {
                                            setAttributeName(e.target.value);
                                        }}
                                        value={attributeName}

                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Form.Group>
                                    <Form.Label> Description </Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{border: attributeError ? "1px soild red" : "0px soild red"}}
                                        onChange={(e) => {
                                            setAttributeDesc(e.target.value);
                                        }}
                                        value={attributeDesc}
                                    />
                                </Form.Group>
                            </Col>
                            {
                                attributeError &&
                                <div className="px-3 pt-3">
                                    <Alert className="alert alert-danger "> Name and Description are
                                        required</Alert>
                                </div>
                            }
                        </Row>

                        <Button variant="primary" className="btn btn-primary float-end mb-4" onClick={() => {
                            handleOnAddAttribute(attributeName, attributeDesc)
                        }}>
                            Add Attribute
                        </Button>
                    </div>
                </Row>
                <Form.Group className="mb-3 col-12">
                    <Form.Label>Seller contact Number</Form.Label>
                    <Form.Control type="number"  {...register("sContact", {
                        required: true,
                        maxLength: 10,
                        minLength: 10
                    })}/>
                    {errors.sContact && <Form.Text className="text-danger "> required </Form.Text>}

                </Form.Group>
                <Form.Group controlId="formFileLg" className="mb-3 m-auto image-upload-container  ">
                    <Form.Label>Product Image Upload</Form.Label>
                    <Form.Control type="file"

                                  {...register("images", {
                                      required: true,
                                  })}/>
                    {errors.images && <Form.Text className="text-danger "> required </Form.Text>}

                </Form.Group>

                {
                    errorMessage != "" &&
                    <Alert className="alert alert-danger">
                        {errorMessage}
                    </Alert>
                }
                <Button variant="primary" className="btn btn-primary float-end mb-4" type="submit">
                    Add Advertisement
                </Button>


            </Row>
        </Form>
    );
}

export default ProductForm;


