var HTTPS = require('https');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

//GroupMe Bot Id and MongoDB access URL.
var botID = process.env.BOT_ID;
var uri = process.env.MONGODB_URI;
var index = require("./index.js");

var will = process.env.will;
var adam = process.env.adam;
var calvin = process.env.calvin;
var andrew = process.env.andrew;
var lydia = process.env.lydia;
var hilde = process.env.hilde;
var mitch = process.env.mitch;

//set global vars
var collection, pizzaCount;

function mongoAdd(name) {
    //connect
    MongoClient.connect(uri, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', uri);
            //read the db
            collection = db.collection("people");
            //addone
            collection.update({
                "name": name
            }, {
                $inc: {
                    "count": 1
                }
            }, function(err, callback) {
                if (err) {
                    console.log(fuck);
                } else {
                    db.close();
                }
            });
        }
        index.refreshMongo();
    });
}

function mongoRead() {
    MongoClient.connect(uri, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', uri);
            //read the db
            collection = db.collection("people");
            //get DB values
            collection.find().toArray(function readData(err, items) {
                console.log(items);
                pizzaCount = will + " ate " + items[0].count + " pizzas. " + hilde + " ate " + items[6].count + " pizzas. " + andrew + " ate " + items[1].count + " pizzas. " + adam + " ate " + items[2].count + " pizzas. " + calvin + " ate " + items[3].count + " pizzas. " + lydia + " ate " + items[5].count + " pizzas. " + mitch + " ate " + items[4].count + " pizzas.";
                postMessage(pizzaCount);
                index.refreshMongo();
            });

        }
        db.close();
    });
}

function postMessage() {
    var botResponse, options, body, botReq;

    botResponse = "Pizza: " + pizzaCount+" See all the pizza stats at http://pizzaman.herokuapp.com/";

    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "text": botResponse
    };

    console.log('sending ' + botResponse + ' to ' + botID);

    botReq = HTTPS.request(options, function(res) {
        if (res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message ' + JSON.stringify(err));
    });
    botReq.on('timeout', function(err) {
        console.log('timeout posting message ' + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
}

function addMessage() {
    var botResponse, options, body, botReq;

    botResponse = "Eat something else for once. Christ. See your pizza stats at http://pizzaman.herokuapp.com/.";

    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "text": botResponse
    };

    console.log('sending ' + botResponse + ' to ' + botID);


    botReq = HTTPS.request(options, function(res) {
        if (res.statusCode == 202) {
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message ' + JSON.stringify(err));
    });
    botReq.on('timeout', function(err) {
        console.log('timeout posting message ' + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
}

exports.mongoAdd = mongoAdd;
exports.mongoRead = mongoRead;
exports.addMessage = addMessage;
