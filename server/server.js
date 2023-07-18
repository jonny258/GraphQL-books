const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const path = require("path");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
const app = express();

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //This sets what the context is going to be from the request sent from the frontend
  context: ({ req }) => ({ req, user: req.user }),
});

app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware); //Custom middle ware to set tokens ect
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

const startApolloServer = async () => {
  await server.start(); //Start the server
  server.applyMiddleware({ app }); //Apply the middleware that was applied to the app

  db.once("open", () => {
    //Connect to mongoDB
    app.listen(PORT, () => {
      //Connect to the app and GraphQL
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer();
