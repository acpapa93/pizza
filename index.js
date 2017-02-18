var http, cool, bot, router, server, port, options;

http        = require('http');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var uri = process.env.MONGODB_URI;

bot         = require('./bot.js');
express     = require("express");
app         = express();
path        =require("path");

//get full GroupMe names.
var will = process.env.will;
var adam = process.env.adam;
var calvin = process.env.calvin;
var andrew = process.env.andrew;
var lydia = process.env.lydia;
var hilde = process.env.hilde;
var mitch = process.env.mitch;


//get days so far in 2017
var today=new Date();
var janOne = new Date("2017-1-1");
var timeinMs=today.getTime()-janOne.getTime();
var daysSince=Math.ceil(timeinMs / (1000*60*60*24));
var previousLeader, newLeader;
app.use(express.static("public"));
app.set("view engine", "jade");
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = app.get('views');



var items, firstCount, secondCount;
function refreshMongo() {
  MongoClient.connect(uri, function(err, db) {
  if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
      console.log("Connection established");
      //read the db
    db.collection("people").find().sort({"count":-1}).toArray(function(err, items){
      console.log(items);

      var rate1=items[0].count/daysSince;
      var rate2=items[1].count/daysSince;
      var rate3=items[2].count/daysSince;
      var rate4=items[3].count/daysSince;
      var rate5=items[4].count/daysSince;
      var rate6=items[5].count/daysSince;
      var rate7=items[6].count/daysSince;

      var houseTotal = items[0].count+items[1].count+items[2].count+items[3].count+items[4].count+items[5].count+items[6].count;
      var houseOvenTime=houseTotal*10;
      var totalDollars=houseTotal*3.5;
      var totalCal=houseTotal*2269;



       options={
        winnerName:items[0].name,
        winnerCount:items[0].count,
        winnerCountYR:Math.round(rate1*365),
        winnerOvenTime:items[0].count*10,
        winnerOvenTimeYR:Math.round(rate1*10*365),
        winnerDollars:items[0].count*3.50,
        winnerDOllarYR:Math.round(rate1*3.5*365),
        winnerCal:items[0].count*2269,
        winnerCalYR:Math.round(rate1*2269*365),
        winnerRate:rate1,

        secondName:items[1].name,
        secondCount:items[1].count,
        secondCountYR:Math.round(rate2*365),
        secondHours:Math.round(items[1].count*10),
        secondHoursYR:Math.round(rate2*10*365),
        secondDollars:Math.round(items[1].count*3.50),
        secondDollarsYR:Math.round(rate2*3.5*365),
        secondCal:Math.round(items[1].count*2269),
        secondCalYR:Math.round(rate2*2269*365),
        secondRate:rate2,

        thirdName:items[2].name,
        thirdCount:items[2].count,
        thirdCountYR:Math.round(rate3*365),
        thirdHours:Math.round(items[2].count*10),
        thirdHoursYR:Math.round(rate3*10*365),
        thirdDollars:Math.round(items[2].count*3.50),
        thirdDollarsYR:Math.round(rate3*3.5*365),
        thirdCal:items[2].count*2269,
        thirdCalYR:Math.round(rate3*2269*365),
        thirdRate:rate3,


        fourthName:items[3].name,
        fourthCount:items[3].count,
        fourthCountYR:Math.round(rate4*365),
        fourthHours:Math.round(items[3].count*10),
        fourthHoursYR:Math.round(rate4*10*365),
        fourthDollars:Math.round(items[3].count*3.50),
        fourthDollarsYR:Math.round(rate4*3.5*365),
        fourthCal:Math.round(items[3].count*2269),
        fourthCalYR:Math.round(rate4*2269*365),
        fourthRate:rate4,


        fifthName:items[4].name,
        fifthCount:items[4].count,
        fifthCountYR:Math.round(rate5*365),
        fifthHours:Math.round(items[4].count*10),
        fifthHoursYR:Math.round(rate5*10*365),
        fifthDollars:Math.round(items[4].count*3.50),
        fifthDollarsYR:Math.round(rate5*3.5*365),
        fifthCal:Math.round(items[4].count*2269),
        fifthCalYR:Math.round(rate5*2269*365),
        fifthRate:rate5,


        sixthName:items[5].name,
        sixthCount:items[5].count,
        sixthCountYR:Math.round(rate6*365),
        sixthHours:Math.round(items[5].count*10),
        sixthHoursYR:Math.round(rate6*10*365),
        sixthDollars:Math.round(items[5].count*3.50),
        sixthDollarsYR:Math.round(rate6*3.5*365),
        sixthCal:Math.round(items[5].count*2269),
        sixthCalYR:Math.round(rate6*2269*365),
        sixthRate:rate6,

        lastName:items[6].name,
        lastCount:items[6].count,
        lastCountYR:Math.round(rate7*365),
        lastHours:Math.round(items[6].count*10),
        lastHoursYR:Math.round(rate7*10*365),
        lastDollarsFIX:Math.round(items[6].count*3.5),
        lastDollarsYR:Math.round(rate7*3.5*365),
        lastCal:Math.round(items[6].count*2269),
        lastCalYR:Math.round(rate7*2269*365),
        lastRate:rate7,

        houseTotal:houseTotal,
        houseOvenTime:houseOvenTime,
        totalDollars:totalDollars,
        totalCal:totalCal

          };
        });
      }
    });
  }

refreshMongo();

app.get("/", function (req, res){

  res.render(__dirname+"/public/pizza.jade", options);
});

app.post("/", function (req, res){
  req.chunks=[];
  req.on("data", function (chunk){
    req.chunks.push(chunk.toString());
    var request = JSON.parse(req.chunks[0]);

    //ReGex check and response
    var pizzaRegex = /^\/pizza$/;
    counterPizzaRegex = /^\/pizzaman$/;
    //Who ate a pizza?
    if (will == request.name && pizzaRegex.test(request.text)) {
        this.res.writeHead(200);
        bot.mongoAdd("will");
        bot.addMessage();
        this.res.end();
    } else if (adam == request.name && pizzaRegex.test(request.text)) {
        this.res.writeHead(200);
        bot.mongoAdd("adam");
        bot.addMessage();
        this.res.end();
    } else if (calvin == request.name && pizzaRegex.test(request.text)) {
        this.res.writeHead(200);
        bot.mongoAdd("calvin");
        bot.addMessage();
        this.res.end();
    } else if (andrew == request.name && pizzaRegex.test(request.text)) {
        this.res.writeHead(200);
        bot.mongoAdd("andrew");
        bot.addMessage();
        this.res.end();
    } else if (mitch == request.name && pizzaRegex.test(request.text)) {
        this.res.writeHead(200);
        bot.mongoAdd("mitch");
        bot.addMessage();
        this.res.end();
    } else if (lydia == request.name && pizzaRegex.test(request.text)) {
        this.res.writeHead(200);
        bot.mongoAdd("lydia");
        bot.addMessage();
        this.res.end();
    } else if (hilde == request.name && pizzaRegex.test(request.text)) {
        this.res.writeHead(200);
        bot.mongoAdd("hilde");
        bot.addMessage();
        this.res.end();
    } else if (request.text && counterPizzaRegex.test(request.text)) {
        this.res.writeHead(200);
        bot.mongoRead();
        this.res.end();
    } else {
        console.log(request);
        console.log("not pizza!");
        this.res.writeHead(200);
        this.res.end();
    }

  });
});

var port = (process.env.PORT || 3000);

app.listen(port, function (){
  console.log("listening on" + port);
});

exports.refreshMongo = refreshMongo;
