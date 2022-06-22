const { response, json } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const fs = require('fs');
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)

app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

// read json file function

function readFiles(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    //console.log(data);
    return JSON.parse(data)
  } 
  catch (err) {
    console.error(err);
  }
}

// all quotes route

app.get("/quotes", function (request, response) {
  let data = readFiles('./quotes-with-id.json');
  response.send(data);
});

// random quote route

app.get("/quotes/random", function (request, response) {  
    let data = readFiles('./quotes-with-id.json');
    let quote = pickFromArray(data);
    response.send(quote);
});

// search route

app.get("/quotes/search", function (request, response) {  
  let data = readFiles('./quotes-with-id.json')
  let result = []
  const term = request.query.term;
  const quote = request.query.quote;
  const author = request.query.author;

  for (let i = 0; i < data.length; i++) {
    if (data[i]["quote"].includes(term) || data[i]["author"].includes(term)) {
      result.push(data[i])
    }
    if (data[i]["quote"].includes(quote)) {
      result.push(data[i])
    }
    if (data[i]["author"].includes(author)) {
      result.push(data[i])
    }
  }
  response.send(result);
});

//START OF YOUR CODE...

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});
