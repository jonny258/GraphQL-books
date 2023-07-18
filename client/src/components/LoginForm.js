// see SignupForm.js for comments
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client"; //useMutation is the react hook that sends a query to the apollo server
import { LOGIN_MUTATION } from "../graphQL/mutations"; //This is the string that I will be passing to send the data
import Auth from "../utils/auth"; //These auth files give me a way to get the user and send context to the backend 

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" }); //destructure the state so that you dont have to have as many variables
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUserMutation, { loading, error, data }] =
    useMutation(LOGIN_MUTATION); //This is the mutation

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {

//The validataion for this is handled in the back end
      const response = await loginUserMutation({
        variables: {
          email: userFormData.email,
          password: userFormData.password,
        },
      });
      const { token, user } = response.data.login;
      console.log(user);
      console.log(token)
      Auth.login(token); //This logs the user in and sets the token / talks to the back end
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    //Clears the form
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange} //This changes the user data to be the current text that is in the fields
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
