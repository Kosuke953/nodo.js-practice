const functions = require("firebase-functions");
const express = require("express");
const requestPromise = require("request-promise-native"); // 追加

const app = express();


// local
// http://localhost:5000/functions-7ef7e/us-central1/helloWorld

// deploy
// https://us-central1-functions-7ef7e.cloudfunctions.net/helloWorld

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// index.js

// APIにリクエストを送る関数を定義
// const getDataFromApi = async (keyword) => {
//     // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
//     const requestUrl = "https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:";
//     const result = await requestPromise(`${requestUrl}${keyword}`);
//     return result;
// };

let apiKey = "token key"
const getDataFromApi = async () => {
    // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
    const requestUrl = "http://api.openweathermap.org/data/2.5/weather?";
    //q=London&limit=5&appid={API key}
    const result = await requestPromise(`q=Tokyo&lang=ja&appid=${apiKey}`);
    return result;
};


    // searchTextに入ってきた文字列を使ってaxiosのURLを組み立てる
    // その上で、axios.getを使ってAPIにアクセスする


app.get("/hello", (req, res) => {
    res.send("Hello Express!");
});

app.get("/user/:userId", (req, res) => {
    // 省略
});

// エンドポイント追加
app.get("/:weather", async (req, res) => {
    // APIリクエストの関数を実行
    const response = await getDataFromApi(req.params.keyword);
    res.send(response);
});

const api = functions.https.onRequest(app);
module.exports = { api };