import {gql} from "@apollo/client";


export  const GET_UNVERIFIED_POST = gql`
    query GetUnverifiedPosts($approved : String!){
         getUnVerifiedPosts(variables: {approved:$approved }){
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
export  const GET_ALL_POST = gql`
    query GetAllPost{
         Posts{
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
