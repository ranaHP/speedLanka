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

