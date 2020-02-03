require("dotenv").config();
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router");
const cors = require("cors");
const parser = require("body-parser");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(parser.json());

var url = process.env.MONGOLAB_URI;

// MongoClient.connect(url, (error, client) => {
//   if (error) {
//     console.log(error);
//   }
//   const db = client.db("heroku_k04slfgv");
//   const questionCollection = db.collection("questions");
//   const questionsRouter = createRouter(questionCollection);
//   app.use("/api/questions", questionsRouter);

//   const userCollection = db.collection("users");
//   const usersRouter = createRouter(userCollection);
//   app.use("/api/users", usersRouter);

//   app.listen(process.env.PORT || 5000, function() {
//     console.log(`app listening on port ${this.address().port}`);
//   });

//   console.log(db);
// });

MongoClient.connect(url)
  .then(client => {
    const db = client.db("heroku_k04slfgv");
    const questionCollection = db.collection("questions");
    const questionsRouter = createRouter(questionCollection);
    app.use("/api/heroku_k04slfgv/questions", questionsRouter);
  })
  .catch(console.err);

MongoClient.connect(url)
  .then(client => {
    const db = client.db("heroku_k04slfgv");
    const userCollection = db.collection("users");
    const usersRouter = createRouter(userCollection);
    app.use("/api/heroku_k04slfgv/users", usersRouter);
  })
  .catch(console.err);

app.listen(process.env.PORT || 5000, function() {
  console.log(`app listening on port ${this.address().port}`);
});
