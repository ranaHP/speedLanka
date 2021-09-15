import {gql} from "@apollo/client";

// for check login validation
export const CHECK_USER_LOGIN_VALIDATIONS = gql`
    mutation CheckLoginValidation($contact : String!, $password: String!){
      getUser(variables: { contact: $contact , password: $password }){
          status
          data
      }
    }

`;

// for crete new user
export const USER_REGISTRATION = gql`
    mutation CheckLoginValidation($_id: String! , $name : String! , $email: String! , $address: String!,   $contact : String!, $password: String!){
      createUser(variables: {
              _id: $_id,
              name: $name,
              email: $email,
              address: $address,
              contact: $contact , 
              password: $password 
        }) {
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

export const CREATE_POST = gql`
    mutation createPostMutation(
      $_id: String !,
      $cType: String !,
      $location: String !,
      $title: String !,
      $price: String !,
      $desc: String !,
      $displayNumber: String !,
      $sellerName: String !,
      $sellerContact: String !,
      $images: String !,
      $approved: String !,
      $date: DateTime !,
      $sellerVerified: String !,
      $attribute: String !
    ){
      createPost(
        variables: {
          _id: $_id,
          cType: $cType,
          location: $location,
          title: $title,
          price: $price,
          desc: $desc,
          displayNumber: $displayNumber,
          sellerName: $sellerName,
          sellerContact: $sellerContact,
          images: $images,
          approved: $approved,
          date: $date,
          sellerVerified: $sellerVerified,
          attribute: $attribute
        }
      ) {
        _id
        cType
        location
        title
        price
        desc
        displayNumber
        sellerName
        sellerContact
        images
        approved
        date
        sellerVerified
        attribute
      }
    }

`;


