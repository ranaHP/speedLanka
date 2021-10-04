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
        message
      }
    }

`;
export const Get_Search_POST = gql`
    query getUnVerifiedPosts(
      $location: String !,
      $category: String !,
      $name: String !,
      $approved: String !,
    ){
      getUnVerifiedPosts(
        variables: {
          approved: $approved
          location: $location
          category: $category
          name: $name
        })    
        {
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
        message
      }
    }

`;


export  const GET_ALL_POST_LIMIT = gql`
    query GetAllPost{
         Postslimit{
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
            message
          }
    }

`;
