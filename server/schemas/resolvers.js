const { User } = require("../models");
const { signToken } = require("../utils/auth");

// Create the functions that fulfill the queries defined in `typeDefs.js`
//This is where the controler type functions will go
const resolvers = {
  Query: {
    getUsersAll: async () => {
      return await User.find({});
    },
    getSingleUser: async (parent, { _id, username }, context) => {
      const foundUser = await User.findOne({
        $or: [{ _id: _id }, { username }],
      });
      console.log(foundUser);
      if (!foundUser) {
        throw new Error("Cannot find a user with this id or username!");
      }

      return foundUser;
    },
  },
  Mutation: {
    createUser: async (parent, { input }, context) => {
      const user = await User.create(input);

      if (!user) {
        throw new Error("Something went wrong!");
      }

      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
      const { user } = context;

      if (!user) {
        throw new Error(
          "Authentication required. Please sign in to save a book."
        );
      }

      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: input.book } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new Error("Error saving the book");
      }
    },
    deleteBook: async (parent, { bookId }, context) => {
      const { user } = context;

      if (!user) {
        throw new Error(
          "Authentication required. Please sign in to save a book."
        );
      }

      try {
        console.log(user)
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        console.log(updatedUser)
        if (!updatedUser) {
          return res
            .status(404)
            .json({ message: "Couldn't find user with this id!" });
        }
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new Error("Error deleting the book");
      }
    },
  },
};

module.exports = resolvers;
