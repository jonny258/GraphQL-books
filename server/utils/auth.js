const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes

  authMiddleware: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    // console.log(req.query);
    // console.log(req.headers);
    let token = req.query.token || req.headers.authorization;
  
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
  
    if (token) {
      // verify token and get user data out of it
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        console.log(data);
        req.user = data;
      } catch {
        console.log('Invalid token');
      }
    }
  
    // send to next endpoint
    next();
  },

  
  // authMiddleware: function (req, res, next) {
  //   // allows token to be sent via  req.query or headers
  //   console.log(req.query)
  //   console.log(req.headers)
  //   let token = req.query.token || req.headers.authorization;

  //   // ["Bearer", "<tokenvalue>"]
  //   if (req.headers.authorization) {
  //     token = token.split(' ').pop().trim();
  //   }

  //   if (!token) {
  //     return res.status(400).json({ message: 'You have no token!' });
  //   }

  //   // verify token and get user data out of it
  //   try {
  //     const { data } = jwt.verify(token, secret, { maxAge: expiration });
  //     console.log(data)
  //     req.user = data;
  //   } catch {
  //     console.log('Invalid token');
  //     return res.status(400).json({ message: 'invalid token!' });
  //   }

  //   // send to next endpoint
  //   next();
  // },
  // authMiddleware: function (req) {
  //   // allows token to be sent via  req.query or headers
  //   let token = req.query.token || req.headers.authorization;
  
  //   // ["Bearer", "<tokenvalue>"]
  //   if (req.headers.authorization) {
  //     token = token.split(' ').pop().trim();
  //   }
  
  //   if (!token) {
  //     req.isAuth = false;
  //     return req;
  //   }
  
  //   // verify token and get user data out of it
  //   try {
  //     const { data } = jwt.verify(token, secret, { maxAge: expiration });
  //     req.user = data;
  //     req.isAuth = true;
  //   } catch {
  //     req.isAuth = false;
  //   }
  
  //   // return the request object so it can be used in the context
  //   return req;
  // },
  
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
