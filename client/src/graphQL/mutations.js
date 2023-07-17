import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;


export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK_MUTATION = gql`
mutation SaveBook($input: Book!) {
    saveBook(input: $input) {
        _id
        username
        savedBooks {
          _id
          authors
          description
          bookId
          image
          link
          title
        }
      }
}
`

export const DELETE_BOOK_MUTATION = gql`
  mutation DeleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        _id
        title
        authors
        bookId
      }
    }
  }
`;
