require('dotenv').config()
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router");
const cors = require("cors");
const parser = require("body-parser");
const mongoose = require(‘mongoose’);

app.use(cors());
app.use(parser.json());

var url = process.env.MONGOLAB_URI;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/your-app-name');

MongoClient.connect(url, (error, client) => {
  if (error) {
    console.log(error);
  }

  const db = client.db("heroku_k04slfgv");
  const questionCollection = db.collection("questions");
  const questionsRouter = createRouter(questionCollection);
  app.use("/api/questions", questionsRouter);

  const userCollection = db.collection("users");
  const usersRouter = createRouter(userCollection);
  app.use("/api/users", usersRouter);

  app.listen(process.env.port || 5000, function() {
    console.log(`app listening on port ${this.address().port}`);
  });
  
});

const port = process.env.PORT || 3000;
app.listen(port)
module.exports = app;
