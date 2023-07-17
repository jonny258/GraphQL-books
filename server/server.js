const express = require('express');

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");

const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

//TEMP
const mockUser = { _id: '64b5926e5b7be53534bd1813', username: 'testuser', email: 'test@example.com' };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //TEMP
  context: () => ({ user: mockUser }),
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });


const startApolloServer = async () => {

  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();

//Maybe get rid of some of the middle ware