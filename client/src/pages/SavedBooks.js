import React, { useState, useEffect, useCallback } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { getMe, deleteBook } from "../utils/API";
import { GET_SINGLE_USER } from "../graphQL/queries";
import { DELETE_BOOK_MUTATION } from "../graphQL/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  const [deleteBookMutation, { loading: deleteBookLoading, error: deleteBookError, data: deleteBookData }] =
  useMutation(DELETE_BOOK_MUTATION);

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  // const { loading, error, data } = useQuery(GET_SINGLE_USER, {
  //   variables: { userId: "64b575b3084f9d2c81e8d20f" },
  // });
  // console.log(data);
  const [userId, setUserId] = useState(null);

  const { loading: singleUserLoading, error: singleUseEerror, data: singleUserData } = useQuery(GET_SINGLE_USER);
  console.log(singleUserData);

  //REMOVE THE USE CALLBACK AND USE EFFECT IF I CAN JUST USE THE USE QUERY
  const getUserData = useCallback(async () => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      console.log(token);
    
      if (!token) {
        return false;
      }
      
      console.log(userData);
      if(singleUserData){
        setUserData(singleUserData.getSingleUser)
      }
    } catch (err) {
      console.error(err);
    }
  }, [singleUserData]);  // Pass 'data' to the dependency array
    // An empty array means the callback never changes

  useEffect(() => {
    getUserData();
  }, [getUserData]);
  

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      //const response = await deleteBook(bookId, token);

      //THIS WORKS BUT HOW
      //ADD VALIDATION ADD COMMENTS
      console.log(bookId)
      const response = await deleteBookMutation({
        variables: { bookId },
      });
      console.log(response)

      // if (!response.ok) {
      //   throw new Error("something went wrong!");
      // }

      // const updatedUser = await response.json();
      // setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book, index) => {
            return (
              <Col md="4" key={index}>
                <Card  border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
