const functions = require("firebase-functions");
const express = require('express');
const requestPromise = require("request-promise-native");
const cors = require('cors');

const app = express();

// app.use(cors());

const getDataFormApi = async (keyword) => {
    const requestUrl = "https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:";
    const result = await requestPromise(`${requestUrl}${keyword}`);
    return result;
}

// local
// http://localhost:5000/functions-7ef7e/us-central1/helloWorld

// firebase deploy
// https://us-central1-functions-7ef7e.cloudfunctions.net/helloWorld

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

app.get('/hello',(req, res) => {
    res.send("hello Express!");
});

app.get("/gbooks/:keyword", cors(), async (req, res) => {
    const response = await getDataFormApi(req.params.keyword);
    res.send(response);
});

//出力
const api = functions.https.onRequest(app);
module.exports = { api };

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
