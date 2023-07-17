// const { gql } = require('apollo-server-express');

// //Figure out what this does
// const typeDefs = gql`
//   # Define which fields are accessible from the Class model
//   type Class {
//     _id: ID
//     name: String
//     building: String
//     creditHours: Int
//   }

//   # Define which queries the front end is allowed to make and what data is returned
//   type Query {
//     classes: [Class]
//   }
// `;

// module.exports = typeDefs;


const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define which fields are accessible from the Class model
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }
  

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    users: [User]
  }
`;

module.exports = typeDefs;
