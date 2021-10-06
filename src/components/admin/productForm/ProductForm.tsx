import React, { useEffect,  useState} from 'react';
import {Alert, Button, Col, Image, Row} from 'react-bootstrap';
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
import UserCategorySearch from "../../userSearchCategory/UserCategorySearch";
import UserLocationSearch from "../../userSearchLocation/UserLocationSearch";
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
    const [createPostMutation, { data, loading, error}] = useMutation(CREATE_POST);
    const [loginDetailsDecodes, setLoginDetailsDecodes] = useState<IloginDetails[] | null>( null);
    const [isPostItem, setIsPostItem] = useState(false);
    const [primaryType, setPrimaryType] = useState<string>("");
    const [secondaryType, setSecondaryType] = useState<string>("Select Categories");
    const [province, setProvince] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [city, setCity] = useState<string>("Select city");
    const [modalShowCategory, setModalShowCategory] = useState(false);
    const [modelShowLocation, setModelShowLocation] = useState(false);


    //image upload
    const [imageUploadFile1, setImageUploadFile1] = useState<File | null >(null);
    const [imageUploadName1, setImageUploadName1] = useState<string >("");
    const [imageUrl1, setImageUrl1] = useState<string>("");
    const [imageUploadFile2, setImageUploadFile2] = useState<File | null >(null);
    const [imageUploadName2, setImageUploadName2] = useState<string >("");
    const [imageUrl2, setImageUrl2] = useState<string>("");
    const [imageUploadFile3, setImageUploadFile3] = useState<File | null >(null);
    const [imageUploadName3, setImageUploadName3] = useState<string >("");
    const [imageUrl3, setImageUrl3] = useState<string>("");
    const [imageUploadMessage, setImageUploadMessage] = useState<string >("");
    const [isLoading, setisLoading] = useState<boolean >(false);

    const getImage = (e: any , number:number) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];

            if(number == 1){
                setImageUploadFile1(file);
                setImageUrl1(URL.createObjectURL(e.target.files[0]));
                setImageUploadName1(e.target.files[0].name);
            }else if(number ==2){
                setImageUploadFile2(file);
                setImageUrl2(URL.createObjectURL(e.target.files[0]));
                setImageUploadName2(e.target.files[0].name);
            }else{
                setImageUploadFile3(file);
                setImageUrl3(URL.createObjectURL(e.target.files[0]));
                setImageUploadName3(e.target.files[0].name);
            }

        }
    };

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
        try{
            setLoginDetailsDecodes(jwt_decode(String(loginDetail.loginDetails ? loginDetail.loginDetails : "")));
        }catch (e) {
            setLoginDetailsDecodes(null)
        }
    }, [loginDetail]);

    const dispatch = useDispatch();

    const onSubmit = async (formData: any) => {

        if(city == "Select city" || secondaryType == "Select Categories" ){
            setErrorMessage("All fields are required!");
            return;
        }
        setErrorMessage("");
        try {
            const data = new Date();
            const newPost = await createPostMutation({
                variables: {
                    _id: String(formData.title+ formData.sContact + Math.floor(Math.random() * 100000)),
                    cType: primaryType.toLowerCase() + '/' + secondaryType.toLowerCase(),
                    location: province.toLowerCase() + '/' + district.toLowerCase() + '/' + city.toLowerCase(),
                    title: formData.title,
                    price: formData.price,
                    desc: formData.desc,
                    displayNumber: formData.sContact,
                    sellerName: loginDetailsDecodes ? loginDetailsDecodes[0].name : "temp..",
                    sellerContact: loginDetailsDecodes ? loginDetailsDecodes[0].contact : "temp..",
                    images: imageUploadName1 +'/'+ imageUploadName2 +'/'+ imageUploadName3,
                    approved: "pending",
                    date: data.getDate(),
                    sellerVerified: loginDetailsDecodes ? loginDetailsDecodes[0].status : "temp..",
                    attribute: JSON.stringify(attributeList)
                }
            });
            setProvince("");
            setDistrict("")
            setCity("Select city");
            setPrimaryType("");
            setSecondaryType("Select Categories");
            setImageUrl1("");
            setImageUrl2("");
            setImageUrl3("");
            reset();
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
            cType: primaryType.toLowerCase() + '/' + secondaryType.toLowerCase(),
            sellerName: loginDetailsDecodes ? loginDetailsDecodes[0].name : "temp..",
            attribute: attributeList ? attributeList : [],
            date: Date(),
            price: watch('price'),
            approved: "approved",
            sellerVerified: loginDetailsDecodes ? loginDetailsDecodes[0].status : "temp...",
            desc: watch("desc"),
            location: province.toLowerCase() + '/' + district.toLowerCase() + '/' + city.toLowerCase(),
            displayNumber: watch("sContact"),
            images: imageUploadName1 +'/'+ imageUploadName2 +'/'+ imageUploadName3,
            sellerContact: loginDetailsDecodes ? loginDetailsDecodes[0].contact : "temp..."
        }));
        setIsPostItem(true);


    }, [imageUrl1, imageUrl2,imageUrl3, attributeList, watch('title'), watch('price'), watch('desc'), watch('sContact') , secondaryType,city ]);

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
        <Form onSubmit={handleSubmit(onSubmit)} className="p-5 col-sm-12  col-md-12 col-md-11  col-lg-10 col-xl-8 m-auto mt-3 bg-light shadow-10 create-post-form"  >
            <ToastContainer/>
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
            <Row>
                {/*{isPostItem &&*/}
                {/*<PostItem componentType={"3"}/>*/}
                {/*}*/}

            </Row>
            <Row className="seller-create-post">
                <Form.Group className="mb-3 col-12">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="string" placeholder="" {...register("title", {
                        required: true,
                    })}/>
                    {errors.title  && <Form.Text className="text-danger "> required </Form.Text>}

                </Form.Group>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-2">
                    <div className="item" >
                        <div className="item-label">
                            Category
                        </div>
                        <div className="item-btn"  onClick={() => setModalShowCategory(true)} >
                            {secondaryType}
                        </div>
                    </div>
                    {
                        secondaryType == "Select Categories" &&
                            <span className="text-danger"> required*</span>
                    }
                </Col>

                <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-2">
                    <div className="item">
                        <div className="item-label">
                            Location
                        </div>
                        <div  className="item-btn" onClick={() => setModelShowLocation(true)} >
                            {city}
                        </div>
                    </div>
                    {
                        city == "Select city" &&
                        <span className="text-danger"> required*</span>
                    }
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
                <Row className="m-0 p-0">
                    <div className="attribute_container  m-auto">
                        <Row className={"pb-3 border-bottom "}>
                            {
                                attributeList?.map((attribute: IAttribute, index: number) => {
                                    return (
                                        <Col xs={12} sm={12} md={6} lg={6} xl={6} key={index} className="m-auto"  >
                                            <Form.Group  >
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

              <div style={{maxWidth: "300px",  height : "400px", display: "flex" , justifyContent : "end" , flexDirection: "column", alignItems: "end"}}>
                  {imageUrl1 != "" && <Image src={imageUrl1} width="80%" className="m-auto" style={{maxWidth: "300px"}}/> }
                  <Form.Group controlId="formFileLg" className="mb-3 m-auto image-upload-container  ">
                      <Form.Label>Product Image Upload</Form.Label>
                      <Form.Control type="file"

                                    {...register("images1", {
                                        required: true,
                                    })}
                                    accept='image/*'
                                    onChange={ e=> {
                                        getImage(e , 1)
                                    }}
                      />
                      {errors.images1 && <Form.Text className="text-danger "> required </Form.Text>}

                  </Form.Group>
              </div>
                <div style={{maxWidth: "300px",  height : "400px", display: "flex" , justifyContent : "end" , flexDirection: "column", alignItems: "end"}}>
                    {imageUrl1 != "" && <Image src={imageUrl2} width="80%" className="m-auto" style={{maxWidth: "300px"}}/> }
                    <Form.Group controlId="formFileLg" className="mb-3 m-auto image-upload-container  ">
                        <Form.Label>Product Image Upload</Form.Label>
                        <Form.Control type="file"

                                      {...register("images2", {
                                          required: true,
                                      })}
                                      accept='image/*'
                                      onChange={ e=> {
                                          getImage(e , 2)
                                      }}
                        />
                        {errors.images2 && <Form.Text className="text-danger "> required </Form.Text>}

                    </Form.Group>
                </div>
                <div style={{maxWidth: "300px",  height : "400px", display: "flex" , justifyContent : "end" , flexDirection: "column", alignItems: "end"}}>
                    {imageUrl1 != "" && <Image src={imageUrl3} width="80%" className="m-auto" style={{maxWidth: "300px"}}/> }
                    <Form.Group controlId="formFileLg" className="mb-3 m-auto image-upload-container  ">
                        <Form.Label>Product Image Upload</Form.Label>
                        <Form.Control type="file"

                                      {...register("images3", {
                                          required: true,
                                      })}
                                      accept='image/*'
                                      onChange={ e=> {
                                          getImage(e , 3)
                                      }}
                        />
                        {errors.images3 && <Form.Text className="text-danger "> required </Form.Text>}

                    </Form.Group>
                </div>


                {
                    errorMessage != "" &&
                    <Alert className="alert alert-danger">
                        {errorMessage}
                    </Alert>
                }
                <Button variant="primary" className="btn btn-primary float-end mb-4" type="submit">
                    {
                        loading ? "loading...." : "Create Advertisement"
                    }
                </Button>


            </Row>
        </Form>
    );
}

export default ProductForm;


