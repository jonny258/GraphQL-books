import { gql } from '@apollo/client';

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

