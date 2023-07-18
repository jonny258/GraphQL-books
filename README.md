# MERN Challenge: Book Search Engine

This project involves refactoring a fully functioning Google Books API search engine, built with a RESTful API, into a GraphQL API using Apollo Server. The application is developed using the MERN stack with a React front-end, MongoDB database, and Node.js/Express.js server and API.

Users can search for books, save their preferred choices, and revisit their saved books list at a later time. The application also features user authentication through a secure login/signup process.

## Table of Contents
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## User Story

```
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```

## Acceptance Criteria

Detailed acceptance criteria can be found in the project instructions. Key highlights include:

- When the user loads the search engine, they are presented with a menu with the options to Search for Books and Login/Signup.
- Users can search for books by entering a search term and hitting the submit button.
- Logged-in users can save books to their account.
- Users can see their saved books and remove books from their saved list.
- Users can logout from the site.

## Technologies Used
- MongoDB
- Express.js
- React.js
- Node.js
- GraphQL
- Apollo Server
- JSON Web Token (JWT) for authentication

## Installation

1. Clone this repository to your local machine.

2. Install the necessary npm packages by running `npm install` in the command line.

3. In your root directory, run `npm run develop` to start the server and connect to the database.

4. Visit `http://localhost:3000` in your browser to view the application.

## Usage

1. On the homepage, users can search for books by entering a keyword into the search field.

2. To save books, users need to signup or login. Once logged in, a "Save This Book!" button appears under each book search result.

3. Users can view their saved books on a separate page, accessible from the menu.

4. Each saved book features a "Remove This Book" button. Clicking it will remove the book from the user's saved list.

5. Users can logout by clicking on the "Logout" button on the menu.

## License

This project is licensed under the terms of the MIT license.


## Questions

If you have any questions about the repo, open an issue or contact me directly at joncolsen3@gmail.com. You can find more of my work at https://github.com/jonny258.

