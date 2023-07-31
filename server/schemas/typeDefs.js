const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Define which fields are accessible from the User model
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    getUsersAll: [User]
    getSingleUser(_id: ID, username: String): User
  }
  # The items that come after the colon is what is returned to the user
  type Mutation {
    createUser(input: CreateUserInput!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    saveBook(input: SaveBookInput!): User
    deleteBook(bookId: String!): User
  }

  # A seperate input to keep the mutation clean
  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input SaveBookInput {
    book: BookInput!
  }

  # A seperate input to keep the mutation clean
  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
