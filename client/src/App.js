import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";
import Auth from "./utils/auth";


const authLink = setContext((_, { headers }) => { 
  //This authLink is middleware that inercepts the out going GraphQL requests and attaches an Authorization header to it
  const token = Auth.getToken(); //This is the authorization header that is attached
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", //This sends the token with the Bearer prefix
    }
  }
});

const httpLink = createHttpLink({ //This is what connects my client to the GraphQL server
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({ //This creates the new instance of the ApolloClient so that I can wrap my app with it and then send request
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), //This allows me to read and write to the client side cache, this is for speed
});

function App() {
  return (
    // Wrap the whole app in the apolloProvider then pass the client that we jsut made to it
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchBooks />} />
            <Route path="/saved" element={<SavedBooks />} />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
