import {gql} from "@apollo/client";

// for check login validation
export const CHECK_USER_LOGIN_VALIDATIONS1 = gql`
    mutation CheckLoginValidation($contact : String!, $password: String!){
      getUser(variables: { contact: $contact , password: $password }) {
        _id
        name
        email
        password
        address
        contact
        status
        roll
      }
    }

`;

export const Approved_ADS = gql`
    mutation approvedAds($_id : String!){
      approvedPost(_id : $_id ){
        isUpdated
      }
    }

`;

export const SET_STATUS_CHANGE = gql`
    mutation ChangeStatus($_id : String! $status : String! ,$message : String!){
      changeStatusPost(status: $status, _id: $_id, message: $message){
        isUpdated
      }
    }
`;

//wedding
// export const Change_Status_Wedding_Post = gql`
//     mutation changeStatusWeddingPost(
//         $_id : String!
//         $status : String! ,
//         $message : String!
//     ){
//       changeStatusWeddingPost(
//         status: $status,
//         _id: $_id,
//         message: $message
//       ){
//         isUpdated
//       }
//     }
//
// `;
//
//
export const Create_Wedding_Post = gql`
    mutation createWeddingPostMutation(
      $_id: String !,
      $fname: String !,
      $lname: String !,
      $age: Float !,
      $email: String !,
      $gender: String !,
      $mobile: String !,
      $bodyType: String !,
      $height: Float !,
      $image: String !,
      $approved: String !,
      $date: String !,
      $maritalStatus: String !,
      $dob: String !,
      $message: String !,
      $location: String !,
      $nationality: String !,
      $desc: String !,
      $lagnaya: String !,
      $language: String !,
      $job: String !,
      $educationLevel: String !,
      $religion: String !,

     ){
      createWeddingPost(variables: {
        _id: $_id,
        fname: $fname,
        lname: $lname,
        age: $age,
        email: $email,
        gender: $gender,
        mobile: $mobile,
        bodyType: $bodyType,
        height: $height,
        image: $image,
        approved: $approved,
        date: $date,
        maritalStatus: $maritalStatus,
        dob: $dob,
        message: $message,
        location: $location,
        nationality: $nationality,
        desc: $desc,
        lagnaya: $lagnaya,
        language: $language,
        job: $job,
        educationLevel: $educationLevel,
        religion: $religion
      }){
        _id
        fname
        lname
        age
        email
        gender
        mobile
        bodyType
        height
        image
        approved
        date
        maritalStatus
        dob
        message
        location
        nationality
        religion
        educationLevel
        job
        language
        lagnaya
        desc
      }
}
`;


