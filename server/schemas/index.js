const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

module.exports = { typeDefs, resolvers };

//Exports these so that they can be called from the server.js with a single require
