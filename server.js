const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(parser.urlencoded({extended: true}));
server.use(express.static("client/build"));

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

MongoClient.connect("mongodb://localhost:27017", function(err, client) {

  if (err) {
    console.log(err);
    return;
  }

  const db = client.db("bucketlist");
  console.log("Connected to database!!");

  server.post("/api/countries", function(req, res, next) {
    const quotesCollection = db.collection("countries");
    const quoteToSave = req.body;
    quotesCollection.save(quoteToSave, function(err, result) {
      if (err) next(err);
      res.status(201);
      res.json(result.ops[0]);
      console.log("saved to database!!");
    })
  });

  server.get("/api/countries", function(req, res, next) {
    const quotesCollection = db.collection("quotes");
    quotesCollection.find().toArray(function(err, allCountries) {
      if (err) next(err);
      res.json(allCountries);
    })
  })

  server.delete("/api/countries", function(req, res, next) {
    const quotesCollection = db.collection("countries");
    quotesCollection.remove({}, function(err, result) {
      if (err) next(err);
      res.status(204).send();
    });
  });

  server.post("/api/countries/:id", function(req, res, next) {
    const quotesCollection = db.collection("countries");
    const objectID = ObjectID(req.params.id);
    quotesCollection.update({_id: objectID}, req.body, function(err, result) {
      if (err) next(err);
      res.status(201).send();
    })
  })

  server.listen(3000, function(){
    console.log("Listening on port 3000");
  });

});
