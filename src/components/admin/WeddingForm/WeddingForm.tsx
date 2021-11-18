import React, { useEffect,  useState} from 'react';
import {Alert, Button, Col, Image, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import {
    IOption
} from "../../../types/MainTypes";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    optionsAgeStart,
    optionsBodyType,
    optionsGender, optionsJob, optionsLagnaya, optionsLanguage,
    optionsMaritalStatus,
    optionsNationality, optionsReligion
} from "../../../config/wedding";
import UserLocationSearch from "../../userSearchLocation/UserLocationSearch";
import {useMutation} from "@apollo/client";
import {CREATE_POST} from "../../../api/user/mutations";
import {Create_Wedding_Post} from "../../../api/admin/mutations";
import axios from "axios";
import {useHistory, useRouteMatch} from "react-router-dom";
import {IloginDetails} from "../../../store/Interfaces/inteface";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducers";
import {imageUploadUrl} from "../../../api/API";
const options: IOption[] = [
]
const WeddingForm: React.FC = () => {

    const {register, handleSubmit, watch, reset ,control, formState: {errors}} = useForm();
    const [province, setProvince] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [city, setCity] = useState<string>("Select location");
    const [modelShowLocation, setModelShowLocation] = useState(false);
    //image upload
    const [imageUploadFile1, setImageUploadFile1] = useState<File | null >(null);
    const [imageUploadName1, setImageUploadName1] = useState<string >("");
    const [imageUrl1, setImageUrl1] = useState<string>("");
    const [isLoading, setisLoading] = useState<boolean >(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [imageUploadMessage, setImageUploadMessage] = useState<string>("");


    const [createWeddingPostMutation, { data, loading, error}] = useMutation(Create_Wedding_Post);

    let {path, url} = useRouteMatch();
    const history = useHistory();
    const [loginDetailsDecodes, setLoginDetailsDecodes] = useState<IloginDetails[] | null>( null);
    const loginDetail: {loginDetails:string}  = useSelector((state: RootState) => state.loginReducer);

    const parseJwt =  (token: string) => {
        try{
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }catch (e) {
            return  "nodata";
        }
    };
    useEffect(() => {
        setLoginDetailsDecodes(parseJwt(loginDetail.loginDetails));
        if(parseJwt(loginDetail.loginDetails) == "nodata"){
            history.push("/login");
        }else {
            history.push("/dashboard/create-wedding");
        }
    }, [loginDetail]);

    const getImage = (e: any , number:number) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setImageUploadFile1(file);
            setImageUrl1(URL.createObjectURL(e.target.files[0]));
            setImageUploadName1(e.target.files[0].name);
        }
    };
    const setAgeStartOption = () => {
        for(let i = 18 ;i < 75; i++){
            let temp:IOption = {
                value: i.toString(),
                label:i.toString()
            }
            optionsAgeStart.push(temp);
        }
    }
    setAgeStartOption();
    const onSubmit = async (formData: any) => {
        if(city === "Select location") return;
        setisLoading(true);
        console.log("asdasd2")
        const file = imageUploadFile1;
        // setImageUploadMessage({message:'Uploading...'})
        setImageUploadMessage("Uploading...");
        if (!file) return;
        const contentType = file.type; // eg. image/jpeg or image/svg+xml

        const generatePutUrl = imageUploadUrl;
        const options = {
            params: {
                Key:  formData.fname + formData.lname + formData.mobile + "." +imageUploadName1.split(".")[imageUploadName1.split(".").length-1],
                ContentType: contentType
            },
            headers: {
                'Content-Type': contentType
            }
        };

        await axios.get(generatePutUrl, options).then(res => {
            const {
                data: {putURL}
            } = res;
            axios
                .put(putURL, file, options)
                .then(async (res: any) => {
                    setImageUploadMessage('Image Upload Successful')
                    setTimeout(() => {
                        setImageUploadMessage('');
                    }, 2000)
                    try {
                        const data = new Date();
                        if (loginDetailsDecodes) {
                            const newPost = await createWeddingPostMutation({
                                variables: {
                                    _id: formData.fname + "/" +loginDetailsDecodes[0].contact,
                                    fname: formData.fname,
                                    lname: formData.lname,
                                    age: Number(formData.age.value),
                                    email: formData.email,
                                    gender: formData.gender.value,
                                    mobile: loginDetailsDecodes[0].contact,
                                    bodyType: formData.bodyType.value,
                                    height: Number(formData.height),
                                    image: formData.fname + formData.lname + formData.mobile + "." + imageUploadName1.split(".")[imageUploadName1.split(".").length - 1],
                                    approved: "pending",
                                    date: (new Date()).toDateString(),
                                    maritalStatus: formData.maritalStatus.value,
                                    dob: formData.dob,
                                    message: "",
                                    location: province.toLowerCase() + '/' + district.toLowerCase() + '/' + city.toLowerCase(),
                                    nationality: formData.nationality.value,
                                    desc: formData.desc,
                                    lagnaya: formData.lagnaya.value,
                                    language: formData.language.value,
                                    job: formData.job.value,
                                    educationLevel: formData.educationLevel,
                                    religion: formData.religion.value,
                                }
                            });
                        }
                        setProvince("");
                        setDistrict("")
                        setCity("Select city");
                        setImageUrl1("");
                        setTimeout(() => {
                            reset();
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
                    } catch (e) {
                        // console.log(e);
                        setErrorMessage("This name already used!");
                        toast.error('Wedding post is not successfully added!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        if (error) {
                            setErrorMessage("This name already used! !");
                        }
                        ;
                    }
                    if (error) {
                        console.log(error);
                        setisLoading(false);

                    }
                    if (data) {
                        console.log(data);
                        setisLoading(false);
                        reset();
                    }
                })
                .catch((err: Error) => {
                    setImageUploadMessage('Sorry, something went wrong on uploading image');
                    setisLoading(false);
                    console.log('err', err);
                    return false;
                });
        });
        // console.log(formData);
        // console.log({variables: {
        //         _id: formData.fname + formData.lname,
        //         fname: formData.fname,
        //         lname: formData.lname,
        //         age: Number(formData.age.value),
        //         email: formData.email,
        //         gender: formData.gender.value,
        //         mobile: formData.mobile,
        //         bodyType: formData.bodyType.value,
        //         height: Number(formData.height),
        //         image: formData.images1[0].name,
        //         approved: "pending  ",
        //         date: (new Date()).toDateString(),
        //         maritalStatus: formData.maritalStatus.value,
        //         dob: formData.dob,
        //         message: "",
        //         location: province.toLowerCase() + '/' + district.toLowerCase() + '/' + city.toLowerCase(),
        //         nationality: formData.nationality.value,
        //         desc: formData.desc,
        //         lagnaya: formData.lagnaya.value,
        //         language: formData.language.value,
        //         job: formData.job.value,
        //         educationLevel: formData.educationLevel,
        //         religion: formData.religion.value,
        //     }});

        setImageUploadMessage("")

    }

    const uploadImages = async () => {

    }
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
            <Row className="seller-create-post">
                <Form.Group className="mb-3 col-6">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="string" placeholder="" {...register("fname", {
                        required: true,
                    })}/>
                    {errors.fname  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3 col-6">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="string" placeholder="" {...register("lname", {
                        required: true,
                    })}/>
                    {errors.lname  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3 col-6">
                    <Form.Label>Age</Form.Label>
                    <Controller
                        render={
                            ({ field }) => <Select
                                {...field}
                                options={optionsAgeStart}
                                styles={customStyles}
                                isClearable={true}
                                isSearchable={true}

                            />
                        }
                        control={control}
                        name="age"
                        rules={{ required: true }}
                    />
                    {errors.age  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3 col-6">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="" {...register("email", {
                        required: true,
                    })}/>
                    {errors.email  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3 col-6">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="string" placeholder="" disabled={true} value={!loginDetailsDecodes  ? "" :loginDetailsDecodes[0].contact} {...register("mobile", {})}/>
                    {<Form.Text className="text-info ">You cannot change your mobile number</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                    <Form.Label>Gender</Form.Label>
                    <Controller
                        render={
                            ({ field }) => <Select
                                {...field}
                                options={optionsGender}
                                styles={customStyles}
                                isClearable={true}
                                isSearchable={true}
                            />
                        }
                        control={control}
                        name="gender"
                        rules={{ required: true }}
                    />
                    {errors.gender  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                    <Form.Label>Body Type</Form.Label>
                    <Controller
                        render={
                            ({ field }) => <Select
                                {...field}
                                options={optionsBodyType}
                                styles={customStyles}
                                isClearable={true}
                                isSearchable={true}
                            />
                        }
                        control={control}
                        name="bodyType"
                        rules={{ required: true }}
                    />
                    {errors.bodyType  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                    <Form.Label>Height (cm)</Form.Label>
                    <Form.Control type="number" placeholder="" {...register("height", {
                        required: true,
                    })}/>
                    {errors.height  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                    <Form.Label>Marital Status</Form.Label>
                    <Controller
                        render={
                            ({ field }) => <Select
                                {...field}
                                options={optionsMaritalStatus}
                                styles={customStyles}
                                isClearable={true}
                                isSearchable={true}
                            />
                        }
                        control={control}
                        name="maritalStatus"
                        rules={{ required: true }}
                    />
                    {errors.maritalStatus  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="" {...register("dob", {
                        required: true,
                    })}/>
                    {errors.dob  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3 col-6">
                    <Form.Label>Permanent District</Form.Label>
                    <div  className="item-btn" onClick={() => setModelShowLocation(true)} >
                        {city}
                    </div>
                    {
                        city == "Select location" &&
                        <span className="text-danger"> required*</span>
                    }
                </Form.Group>

                <Form.Group className="mb-3 col-6">
                    <Form.Label>Nationality</Form.Label>
                    <Controller
                        render={
                            ({ field }) => <Select
                                {...field}
                                options={optionsNationality}
                                styles={customStyles}
                                isClearable={true}
                                isSearchable={true}
                            />
                        }
                        control={control}
                        name="nationality"
                        rules={{ required: true }}
                    />
                    {errors.nationality  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                    <Form.Label>Religion</Form.Label>
                    <Controller
                        render={
                            ({ field }) => <Select
                                {...field}
                                options={optionsReligion}
                                styles={customStyles}
                                isClearable={true}
                                isSearchable={true}
                            />
                        }
                        control={control}
                        name="religion"
                        rules={{ required: true }}
                    />
                    {errors.religion  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3 col-6">
                    <Form.Label>Education Level</Form.Label>
                    <Form.Control type="string" placeholder="" {...register("educationLevel", {
                        required: true,
                    })}/>
                    {errors.educationLevel  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                    <Form.Label>Job</Form.Label>
                    <Controller
                        render={
                            ({ field }) => <Select
                                {...field}
                                options={optionsJob}
                                styles={customStyles}
                                isClearable={true}
                                isSearchable={true}
                            />
                        }
                        control={control}
                        name="job"
                        rules={{ required: true }}
                    />
                    {errors.job  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                    <Form.Label>Language </Form.Label>
                    <Controller
                        render={
                            ({ field }) => <Select
                                {...field}
                                options={optionsLanguage}
                                styles={customStyles}
                                isClearable={true}
                                isSearchable={true}
                            />
                        }
                        control={control}
                        name="language"
                        rules={{ required: true }}
                    />
                    {errors.language  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                    <Form.Label>Lagnaya</Form.Label>
                    <Controller
                        render={
                            ({ field }) => <Select
                                {...field}
                                options={optionsLagnaya}
                                styles={customStyles}
                                isClearable={true}
                                isSearchable={true}
                            />
                        }
                        control={control}
                        name="lagnaya"
                        rules={{ required: true }}
                    />
                    {errors.lagnaya  && <Form.Text className="text-danger "> required </Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3 col-6">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="string" placeholder="" {...register("desc", {
                        required: true,
                    })}/>
                    {errors.desc  && <Form.Text className="text-danger "> required </Form.Text>}
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
                <Button variant="primary" className="btn btn-primary float-end mb-4" type="submit">
                    {
                        imageUploadMessage != "" ? "loading...." : "create post"
                    }
                </Button>

            </Row>
        </Form>
    );
}

export default WeddingForm;


