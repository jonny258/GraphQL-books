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
  query GetSingleUser($userId: ID!) {
    getSingleUser(_id: $userId) {
      _id
      username
      email
      bookCount
    }
  }
`;

