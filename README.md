# OL Basement

Welcome to OL Basement! 

'OL Basement' is a versatile inventory management app designed for home basement or any storage facility tracking.

## General Information

- Project Name: OL Basement
- Purpose: To manage and track inventory and space in home basements or other storage facilities.
- Technology Stack: MERN

 It’s built with MERN stack technologies, offering features like user authentication, space calculation in cubic meters, and a visual progress bar indicating used space. Additional functionalities include secure password handling, CRUD operations for storage data, item categorization, Excel export, and light/dark mode visuals. Support is facilitated through a contact form using EmailJS.

## Technologies Used

This a full-stack application designed using a well-known MERN stack. The MERN stack is a popular set of technology used to build modern web applications. It is an acronym that stands for MongoDB, Express.js, React, and Node.js where:

- MongoDB: is a document-based, NoSQL database used to store application data in a flexible, JSON-like format.
- Express.js: is a lightweight web application framework for Node.js, designed for building web applications and APIs.
- React: is a JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.
- Node.js: is a JavaScript runtime built on Chrome’s V8 JavaScript engine, used to build scalable network applications.

### Third-party NPM packages

This project leverages a variety of third-party npm packages across the frontend and backend to implement diverse functionalities, ensuring a robust and feature-rich application experience.

BACK-END of the application uses the following third-party npm packages / dependencies:

- bcrypt: Used for hashing passwords, providing a secure way to store and compare user passwords.
- cors: Enables Cross-Origin Resource Sharing (CORS), allowing the backend to process requests from different domains.
- dotenv: A module that loads environment variables from a .env file into process.env, helping manage configuration settings securely.
- express: A framework for Node.js, used to build web applications and APIs.
- jsonwebtoken: A package that implements JSON Web Tokens, used for securely transmitting information between parties as a JSON object.
- mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js that manages relationships between data and provides schema validation.
- node-mailjet: A client library for the Mailjet API, used to send transactional emails, used in this application particularly for password reset emails.

FRONT-END of the application uses the following third-party npm packages / dependencies:

- @emailjs/browser: A library that allows sending emails using EmailJS service directly from the browser without server-side code.
- @fullhuman/postcss-purgecss: A PostCSS plugin used to remove unused CSS, which helps in reducing file size and improving load times. 
- @reduxjs/toolkit: It provides a set of tools to simplify Redux development, such as configuring the store and creating reducers and actions.
- date-fns: This package manipulates JavaScript dates - it helps with formatting and handling dates within the app.
- node-sass: A library that allows you to natively compile .scss files to css at incredible speed and automatically via a connect middleware.
- react-csv: Provides CSV download functionality for your React application, allowing users to export data as a CSV file.
- react-redux: It lets the React components to read data from a Redux store, and dispatch actions to the store to update data.
- react-router-dom: A DOM binding for React Router, which is used for dynamic routing in web applications built with React.

### Web development and deployment third-party services

The following third-party services utilized in this project collectively enhance the project’s email functionality and deployment processes:

- MailJet: Used for managing transactional emails - as the node-mailjet npm package, this service is also used for password reset emails.
- EmailJS: This service handles sending & receiving emails through the 'Contact' page using the above mentioned "@emailjs/browser" npm package.
- Netlify: Hosts the React front-end.
- Vercel: Hosts the serverless backend.

## Features

The following list of features emphasizes that the app is well-equipped to make storage management more efficient for the user. Naturally, there is always room for improvement!

- User Account Management: Sign up, log in, and password reset capabilities with secure password encryption using bcrypt.
- Intuitive Storage Tracking: Enter and manage storage facility details like title and dimensions.
- Item Cataloging: Add items with details such as title, dimensions, description, and category.
- Space Management: Automatic calculation of remaining storage space in cubic meters and visual representation of space usage with a progress bar.
- Data Export: Download an Excel spreadsheet of all stored items using the 'react-csv' package.
- Easy Item Filtering: Quickly filter items by category with a single click.
- Customizable Interface: Choose between light and dark mode for visual comfort.
- Developer Support: Contact form integrated with 'EmailJS' service for user support inquiries.
- Security: Session timeout after one hour to ensure user security.

## Setup

Following are the simple steps to get the app up and running on your local machine for development and testing purposes.
NOTE: The setup instructions provided below are for npm (Node Package Manager). If you’re using a different package manager or framework, please adapt the following steps accordingly to suit your development environment.

### Clone the repository

1) Type in the following URL to the browser and navigate to the repository: https://github.com/Nele82/OL-Basement.git
2) Open your preferred CLI or integrated terminal in your code editor, and type in the following command to clone the project repository: 'git clone https://github.com/Nele82/OL-Basement.git'

### Install dependencies

After cloning, you’ll find the complete codebase in your specified folder. The project is organized into 'frontend' and 'backend' folders within the main 'OL-Basement' folder. Please open 'frontend' and 'backend' folders individually, open your preferred CLI or integrated terminal in your code editor and type the following command: 'npm install'
Both 'frontend' and 'backend' folders contain the 'package.json' files used for managing the project's dependencies, scripts, version and more so this will install all the dependencies needed for the app to work.

### Database setup (Backend)

Being a MERN application, this project uses a MongoDB NoSQL database to store application data. In order to set it up, please navigate to 'https://www.mongodb.com/developer/videos/the-ultimate-mern-stack-complete-guide-mongodb-express-react-node-js-/' and follow step-by-step instructions provided or check out some of the cool as there will be a URI (Uniform Resource Identifier) containing information like the hostname, port, database name, and credentials needed to connect your backend with the MongoDB database. Since this information should be available only to the developer, an environment variable needs to be set which we'll discuss in more detail in the next section. 


