const { User } = require('../models');

// Create the functions that fulfill the queries defined in `typeDefs.js`
//This is where the controler type functions will go
const resolvers = {
  Query: {
    users: async () => {
      // Get and return all documents from the classes collection
      return await User.find({});
    }
  }
};

module.exports = resolvers;