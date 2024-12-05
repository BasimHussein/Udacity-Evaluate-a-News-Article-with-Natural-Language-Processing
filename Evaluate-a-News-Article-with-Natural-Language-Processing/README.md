# Project: Evaluate a news article with Natural Language Processing

## Overview

This project requires you to make a successful call to the API on form submission. If this is successful, the API keys and response handling were done correctly.

## Setup and Dependencies

first we run npm i to install the packages in the package.json file

### To get the project up and running follow the steps below:

these are the script needed to run the project

- "test": "jest",
- "start": "nodemon src/server/server.js",
- "dev": "webpack-dev-server --config webpack.dev.js --open",
- "build": "webpack --config webpack.prod.js"
  the webpack dev server runs on port 8080
  the express server runs on port 8000

## Important Notes

as mentioned in the project instructions
we were supposed to use this github repo https://github.com/Mido055/evaluate-news-nlp
and choose refresh-2019 branch but it doesn't exist in that url
i found the branch here in a link that was given in the previous project https://github.com/udacity/fend/tree/refresh-2019
i used both of them as a reference and i started working to build the from an empty folder

I changed the css files given to scss and changed the styles and added some in the empty files

there were problem in the meaningcloud website in order to login and to acquire a key this took alot of time to handle

some times when you use the api alot you get a message
msg : "Credits per subscription exceeded"

Iam supposed to upload the project with out dist folder and node_modules
and the .env file is not a good practice to be uploaded but uploaded it so the project will be functional without extra input needed
