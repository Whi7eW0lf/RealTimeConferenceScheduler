const mongoose = require("mongoose");

const mongodb = require("mongodb");

const mongoClient = require("mongodb");

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
let _db;
const mongoConnect = (callback) => {

    MongoClient.connect("mongodb+srv://banea9:stonnerexe95@conference.uwatr.mongodb.net/conference?retryWrites=true&w=majority").then(client => {
        console.log("Connected")
        console.log(client)
        _db = client.db()
        callback()
    }).catch(err => console.log(err))
}

module.exports = mongoConnect;