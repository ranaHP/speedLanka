import {gql} from "@apollo/client";


export const Get_SELLER_POST = gql`
    query createPostMutation(
      $sellerContact: String !,
    ){
     getPost(variables: {sellerContact: $sellerContact}){
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
