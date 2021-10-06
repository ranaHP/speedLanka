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
            message
          }
    }

`;


//wedding

export  const GET_ALL_Wedding_POST = gql`
    query GetAllWeddingPost{
         WeddingPosts{
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
export  const GET_SEARCH_Wedding_POST = gql`
    query getWeddingPostSearch(
        $gender : String!
        $ageFrom : Float!
        $ageTo : Float!
        $religion : String!
        $language : String!
        $job : String!
        ){
         getWeddingPostsSearch(variables:{
            gender: $gender,
            ageFrom: $ageFrom,
            ageTo: $ageTo,
            religion: $religion,
            language: $language,
            job: $job
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
export  const GET_Wedding_POST_FOR_SELLER = gql`
    query getWeddingPostForSeller(
        $sellerContact : String!
        ){
         getWeddingPostForSeller(variables:{
            sellerContact: $sellerContact,
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
