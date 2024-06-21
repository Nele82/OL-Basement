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

- MailJet: Used for managing transactional emails - this service is used for password reset emails and it is complemented by the 'node-mailjet' npm package.
- EmailJS: This service handles sending & receiving emails through the 'Contact' page using the above mentioned "@emailjs/browser" npm package.
- Netlify: Hosts the frontend (React.js).
- Render.com: Hosts the backend (Express.js).

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

## Setup (for the local environment)

Following are the simple steps to get the app up and running on your local machine for development and testing purposes.
NOTE: The setup instructions provided below are for npm (Node Package Manager). If you’re using a different package manager or framework, please adapt the following steps accordingly to suit your development environment.

### Clone the repository

Open your preferred CLI or integrated terminal in your code editor, and type in the following command to clone the project repository: 'git clone https://github.com/Nele82/OL-Basement.git'

### Install dependencies

After cloning, you'll find the complete codebase in your specified folder. The project is organized into 'frontend' and 'backend' folders within the main 'OL-Basement' folder. Please open 'frontend' and 'backend' folders individually, open your preferred CLI or integrated terminal in your code editor and type the following command: 'npm install'
Both 'frontend' and 'backend' folders contain the 'package.json' files used for managing the project's dependencies, scripts, version and more so this will install all the dependencies needed for the app to work.

### HTTP development & production addresses

TBA

### Database setup (Backend)

Being a MERN application, this project uses a MongoDB NoSQL database to store application data. In order to set it up, please navigate to 'https://www.mongodb.com/developer/videos/the-ultimate-mern-stack-complete-guide-mongodb-express-react-node-js-/' and follow step-by-step instructions provided or check out some of the cool 'YouTube' videos on the subject as there will be a URI (Uniform Resource Identifier) containing information like the hostname, port, database name, and credentials needed to connect your backend a the MongoDB database. Since this information should be available only to the developer, an environment variable needs to be set which we'll discuss in more detail in the next section. 

### Environment variables

Environment variables are used to manage configuration settings for applications. They are stored in a file named .env in the root of any project. As mentioned in the previous section, this allows us to keep sensitive information like API keys, database passwords, and other secrets out of the codebase. In light of this fact, .env variables should be included in your .gitignore file to prevent them from being committed to version control (in most cases - GitHub). This project uses the following variables which are all located in their respective .env files (Frontend and Backend):

#### 'MONGODB' 
- Location: '/backend/.env' (back-end root folder)
- Usage: Used in 'server.js' module/file in order to connect with a MongoDB database through the 'process.env' global object (process.env.MONGODB)
- Access in Node.js: 'require('dotenv').config()' called at the beginning of the entry file before any other code runs - in this case: 'server.js'
- Setup: Check out the guide at 'https://www.mongodb.com/developer/videos/the-ultimate-mern-stack-complete-guide-mongodb-express-react-node-js-/' 
#### 'PORT'
- Location: '/backend/.env' (back-end root folder)
- Usage: Used in 'server.js' module/file in order to listen on a specific port through the 'process.env' global object (process.env.PORT)
- Access in Node.js: 'require('dotenv').config()' called at the beginning of the entry file before any other code runs - in this case: 'server.js'
- Setup: Assign any free port number - make sure that other parts of the application are not already listening to the same port
#### 'SECRET_KEY'
- Location: '/backend/.env' (back-end root folder)
- Usage: Used in 'userController.js' module/file in order to create a JWT (JSON Web Token) signature through the 'process.env' global object (process.env.SECRET_KEY)
- Access in Node.js: 'require('dotenv').config()' called at the beginning of the entry file before any other code runs - in this case: 'server.js' 
- Setup: Assign any secret key, but make sure that it is not reused across different applications or services to prevent cross-application attacks and make it long and complex
#### 'MJ_APIKEY_PUBLIC' 
- Location: '/backend/.env' (back-end root folder)
- Usage: Used in 'userController.js' module/file through the 'process.env' global object (process.env.MJ_APIKEY_PUBLIC) in order for the 'requestReset' function 
  (password reset request function) to run
- Access in Node.js: 'require('dotenv').config()' called at the beginning of the entry file before any other code runs - in this case: 'server.js' 
- Setup: Check out the guide at 'https://dev.mailjet.com/email/guides/getting-started/' 
#### 'MJ_APIKEY_PRIVATE' 
- Location: '/backend/.env' (back-end root folder)
- Usage: Used in 'userController.js' module/file through the 'process.env' global object (process.env.MJ_APIKEY_PRIVATE) in order for the 'requestReset' function 
  (password reset request function) to run
- Access in Node.js: 'require('dotenv').config()' called at the beginning of the entry file before any other code runs - in this case: 'server.js' 
- Setup: Check out the guide at 'https://dev.mailjet.com/email/guides/getting-started/' 
#### 'REACT_APP_EMAILJS_PUBLIC' 
- Location: '/frontend/.env' (front-end root folder)
- Usage: Used in 'Contact.js' module/file through the 'process.env' global object (process.env.REACT_APP_EMAILJS_PUBLIC) in order to utilize the 'EmailJS' service
  through the 'sendEmail' function
- Access in React.js: Called directly inside the 'sendEmail' function with 'REACT_APP_' prefix for security reasons - no npm package needed
- Setup: Check out the guide at 'https://www.emailjs.com/docs/tutorial/overview/' 

NOTE: All above variables in their respective .env files may be renamed, but then they also need to be renamed in their respective usage locations. Keep in mind that the one used in 
the frontend part of the application (React.js) always needs to have the prefix 'REACT_APP_' (e.g. REACT_APP_VARIABLE_NAME).

## Running the app

After completing the installation of dependencies, configuring the MongoDB database, and setting up the necessary environment variables, please proceed by opening your preferred command line interface (CLI) or the integrated terminal within your code editor. Then, execute the following commands in their corresponding folders:

- Inside the 'backend' folder: run 'npm run dev' in the terminal - this is to connect the backend to the MongoDB database and listen for the client's requests
- Inside the 'frontend' folder: run 'npm run dev' in the terminal - this is to launch the app in development mode which will open the UI (User Interface) itself
- Inside the 'frontend' folder: run 'npm run node-sass' in the terminal - this is to compile .scss files to css

Expected Output:

- For the backend: A message in the terminal "Connected to the MongoDB collection / Listening to port 3500" (if the 'PORT' variable is assigned number 3500 in '/backend/.env file - in other words, the terminal console will display whichever port number is assigned)
- For the frontend: A message in the terminal like "Compiled successfully" (depending on your environment)
- For compiling SCSS: A message in the terminal like "Sass is watching for changes. Press Ctrl-C to stop." 

NOTE: If you encounter any issues, check if all environment variables are set correctly as well as if MongoDB is running. To stop the servers, press Ctrl + C in your terminal.

## Usage

This section provides step-by-step instructions on how to use the main features of an application. 

- Account Setup: Sign up and log in to create your personal account. Use the password reset feature if needed.
- Facility Details: Enter your storage facility's title and dimensions to start tracking.
- Item Entry: Add items with their title, dimensions, description, and category.
- Space Management: View the remaining space in cubic meters and occupied space percentage through a progress bar.
- Data Handling: Download item details as an Excel Spreadsheet or filter items by category.
- Customization: Choose between light and dark mode for visual comfort.
- Support: Contact the developer through the in-app contact form for any assistance.

## Contact 

Your feedback is highly valued and consistently taken into account to enhance the functionality and user experience of the 'OL Basement'. If you come across any issues or have suggestions for improvement, please feel free to get in touch:

LinkedIn: https://www.linkedin.com/in/nebojsa-pavlovic-5b2733164/

GitHub: https://github.com/Nele82

Portfolio website: https://nebojsapavlovic.netlify.app/