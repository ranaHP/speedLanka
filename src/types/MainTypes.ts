export interface IProduct {
    id: number
    image: string
    name: string
    category: string
    qty: number | 1
    price: number
    discount: number
    total: number
}

export interface IOrder {
    id: string
    productList: IProduct[] | null
    totalPrice: number
    discount: number
    netTotal: number
    deliveryCharge: number

}

export interface IFormGroup {
    name: string
    label: string
    type: string
    error: string | null
    value: string
}

export interface INavItem {
    title : string,
    route : string,
    icon: string,
    subNav: INavItem [] | null
}

export  interface  IOption {
    label: string
    value: string
}

export interface IAttribute {
    name:String,
    desc: String
}
export interface IFormData {
    cType: string
    location: String
    title: string
    price: string
    desc: string
    attribute: IAttribute []
    sellerName: string
    sellerContact: string
    images: string
    approved:string
    date: string
    sellerVerified: string
    displayNumber: string
    _id:string
}
export interface IFormDataResponse {
    cType: string
    location: string
    title: string
    price: string
    desc: string
    attribute: string
    sellerName: string
    sellerContact: string
    images: string
    approved:string
    date: string
    sellerVerified: string
    displayNumber: string
    _id:string
    message?:string
}
export interface ILocation {
    province: string
    distrisct: string
    city: string
}
export interface ICategory {
    name: string
    subCategory: {name: string} []
}
export interface ICategoryOption {
    name: string
    subCategory: string
}

export interface IWeddingResponse {
    _id : string
    fname: string
    lname: string
    age: string
    email: string
    gender: string
    mobile: string
    bodyType: string
    height: string
    image: string
    approved: string
    date: string
    maritalStatus: string
    dob: string
    message: string
    location: string
    nationality: string
    religion: string
    educationLevel: string
    job: string
    language: string
    lagnaya: string
    desc: string
}