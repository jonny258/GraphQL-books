import React, { useState, useEffect, useCallback } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { GET_SINGLE_USER } from "../graphQL/queries";
import { DELETE_BOOK_MUTATION } from "../graphQL/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  const {
    loading: singleUserLoading,
    error: singleUseEerror,
    data: singleUserData,
  } = useQuery(GET_SINGLE_USER); //This is what gets the single user, it doesn't need a variable because of context
  const [
    deleteBookMutation,
    {
      loading: deleteBookLoading,
      error: deleteBookError,
      data: deleteBookData,
    },
  ] = useMutation(DELETE_BOOK_MUTATION);
  //This is what deletes the book from the backend, the vaiables above have to be called  loading, error, and data.
  //But you can get around that by doing what I did above

  const userDataLength = Object.keys(userData).length;

  const getUserData = async () => {
    try {
      //This makes sure that the user is logged in if not the if statement below will trigger causeing this function to return false
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      if (singleUserData) {
        //This checks to see if the singleUserData is not null before setting it to the userState
        setUserData(singleUserData.getSingleUser);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //This useEffect runs whenever the singleUserData is changed, it only changes one time just when it is initially assigned from the useQuery
  //This ensures that that the singleUserData is defined and able to be worked with in the getUserData function
  useEffect(() => {
    getUserData();
  }, [singleUserData]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      //This removes the book based on the google bookId
      const response = await deleteBookMutation({
        variables: { bookId },
      });
      console.log(response);
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
                <Card border="dark">
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
