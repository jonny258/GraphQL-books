import { gql } from "@apollo/client";
//Mutations cover what the PUT, POST, and DELETE methods would do in a normal REST API

//The wrapper around the actual mutation call is there to define the variables that I need to pass into it, and the type of data that the variable needs to be
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

//I don't need to explicity define that this needs a username, password, and email here --
// because I have a seperate input in the TypeDefs file called CreateUserInput that requires all of those fields
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

//Same with this one in the TypeDefs file I have a seperate input called SaveBookInput that requires different fields
export const SAVE_BOOK_MUTATION = gql`
  mutation SaveBook($input: SaveBookInput!) {
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
`;

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

//Every thing in the second curly braces is what gets returned when you call this function, it knows to return a user, or a book because it is defined in the backend
//If you want less data you can simply remove one of the lines and you won't get that line of data, so if you want all the users but you don't want there emails just remove that line

//With the SAVE_BOOK_MUTATION and the DELETE_BOOK_MUTATION, these require a user to delete the book or add the book to there savedBooks array
//I am able to get the current user because of the context, the context of the logged in user is set in the app.js file on the client side and then that is passed to the backend
//so that the backend always has the current logged in user
