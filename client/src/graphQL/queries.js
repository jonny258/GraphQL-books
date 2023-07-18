import { gql } from "@apollo/client";

//The querys cover what the GET method would do in a normal REST API
export const GET_ALL_USERS = gql`
  query {
    getUsersAll {
      _id
      email
      username
      password
      bookCount
      savedBooks {
        _id
        title
        authors
      }
    }
  }
`;

//This one gets a single user based of the context set in the app.js
//GET_SINGLE_USER takes in no variables but still just gets the current logged in user that is all
export const GET_SINGLE_USER = gql`
  query {
    getSingleUser {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        title
        authors
        link
        description
        bookId
        image
      }
    }
  }
`;
