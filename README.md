# OL Basement

Welcome to OL Basement! 

'OL Basement' is a versatile inventory management app designed for home basement or any storage facility tracking.

## General Information

- Project Name: OL Basement
- Purpose: To manage and track inventory and space in home basements or other storage facilities.
- Technology Stack: MERN

 It’s built with MERN stack technologies, offering features like user authentication, space calculation in cubic meters, and a visual progress bar indicating used space. Additional functionalities include secure password handling, CRUD operations for storage data, item categorization, Excel export, and light/dark mode visuals. Support is facilitated through a contact form using EmailJS.

## Tecnologies Used

This a full-stack application designed using a well-known MERN stack. The MERN stack is a popular set of technology used to build modern web applications. It is an acronym that stands for MongoDB, Express.js, React, and Node.js where:

- MongoDB: is a document-based, NoSQL database used to store application data in a flexible, JSON-like format.
- Express.js: is a lightweight web application framework for Node.js, designed for building web applications and APIs.
- React: is a JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.
- Node.js: is a JavaScript runtime built on Chrome’s V8 JavaScript engine, used to build scalable network applications.

### Third-party NPM packages

This project leverages a variety of third-party npm packages across the frontend and backend to implement diverse functionalities, ensuring a robust and feature-rich application experience.

- Back-end of the application uses the following third-party npm packages / dependencies:

> bcrypt: Used for hashing passwords, providing a secure way to store and compare user passwords.
> cors: Enables Cross-Origin Resource Sharing (CORS), allowing the backend to process requests from different domains.
> dotenv: A module that loads environment variables from a .env file into process.env, helping manage configuration settings securely.
> express: A framework for Node.js, used to build web applications and APIs.
> jsonwebtoken: A package that implements JSON Web Tokens, used for securely transmitting information between parties as a JSON object.
> mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js that manages relationships between data and provides schema validation.
> node-mailjet: A client library for the Mailjet API, used to send transactional emails, used in this application particularly for password reset emails.

- Front-end of the application uses the following third-party npm packages / dependencies:

> @emailjs/browser: A library that allows sending emails using EmailJS service directly from the browser without server-side code.
> @fullhuman/postcss-purgecss: A PostCSS plugin used to remove unused CSS, which helps in reducing file size and improving load times. 
> @reduxjs/toolkit: It provides a set of tools to simplify Redux development, such as configuring the store and creating reducers and actions.
> date-fns: This package manipulates JavaScript dates - it helps with formatting and handling dates within the app.
> node-sass: A library that allows you to natively compile .scss files to css at incredible speed and automatically via a connect middleware.
> react-csv: Provides CSV download functionality for your React application, allowing users to export data as a CSV file.
> react-redux: It lets the React components to read data from a Redux store, and dispatch actions to the store to update data.
> react-router-dom: A DOM binding for React Router, which is used for dynamic routing in web applications built with React.

### Web development and deployment third-party services

The following third-party services utilized in this project collectively enhance the project’s email functionality and deployment processes:

> MailJet: Used for managing transactional emails - as the node-mailjet npm package, this service is also used for password reset emails.
> MailJS: This service handles sending & receiving emails through the 'Contact' page using the above mentioned "@emailjs/browser" npm package.
> Netlify: Hosts the React front-end.
> Vercel: Hosts the serverless backend.