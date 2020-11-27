# Whatsapp Menu-based Chatbot
A Whatsapp chatbot application which is capable of custom menu-based conversations with end users.

It is built by extending the **whatsapp-web.js** which uses Puppeteer to run a real instance of Whatsapp.

The primary user can use the frontend side of the application to build a chat menu for the whatsapp interface by specifying commands, command types and associcated replies.

After building the chat menu, the primary user can begin serving as the Whatsapp API client and listen for incoming messages from the end users. Based on the menu options, conversation is then carries out.

## Setup

In order to set up the project, perform the following steps in the same order:

*	Clone the repository from Github onto your local system
*	Open the downloaded directory in your preferred code editor
*	In the terminal, your current directory will be ***'/whatsapp-menu-based-chatbot'***
*	Enter the backend directory using command ***'cd backend/'*** 
*   Then run the script ***'npm install'*** to install all backend dependencies
*   Next, set up your MongoDB database instance (either through Atlas or locally)
*   This project uses MongoDB Atlas, but can specify either a MongoDB Atlas URI or local MongoDB URI in the ATLAS_URI configuration of the ***'.env'*** file
*   Now, go back the the home directory using command ***'cd ..'***
*   Enter the frontend directory using command ***'cd frontend/'***
*   Then run the script ***'npm install'*** to install all frontend dependencies

## Running the project

### Backend

*   Enter the src folder within the backend directory using command ***'cd backend/src/'***
*   Run the command ***'npm run start'***
*   You should see Server running and MongoDB connection success messages in the console

### Frontend

*   Enter the src folder within the frontend directory using command ***'cd frontend/src/'***
*   Run the command ***'npm start'***
*   The react app can be accessed by typing url ***'http://localhost:5000/'*** in the browser (preferably Google Chrome)

## Connecting the client

After setting up and successfully running the project, a chat menu can be built using the web app.
After the primary user has created a chat menu, he/she is ready to serve as the Whatsapp API client.

Perform the following steps in the same order:

*   Take a mobile device with an active whatsapp connection
*   Open the Whatsapp Web QR code scanner through the app
*   Use it to scan the latest QR code displayed in the project console
*   If the console shows ***'Client is ready!'***, that means the device has been succcessfully setup as the client
*   Now, you can start chatting with the client from another device using the chat menu

## Command architecture

Please follow the below format while designing the chat menu.

| Command | Description |
| ------------- | ------------- |
| # | To start the chat |
| 0 | Base command with chat menu options |
| 1 onwards | Chat menu based commands |

## Error message structure

Below is a table showing what kind of error messages are sent to the end users if they input wrong commands.

| Case | Error message sent in reply |
| ------------- | ------------- |
| If chat not yet started and any command other than # sent | Please start the chat first by sending "#" |
| If chat has been started and non-numeric command other than # sent | Your input was incorrect ! |
| If chat has been started and 0 is sent as a command | Choose a correct option |
| If chat has been started and any numeric command not in the database is sent | Choose a correct option |

