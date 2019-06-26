'use strict';
const BootBot = require('bootbot');
var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var axios = require("axios");

var PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.post('/webhook', (req, res) => {  
    let body = req.body;
    if (body.object === 'page') {
      body.entry.forEach(function(entry) {
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
      });
      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.sendStatus(404);
    }
  });

const bot = new BootBot({
  accessToken: 'EAAg1tJTonMgBAOJFbA0zDYn9rbEmM71acL752VVvwJZCM28GW04WKuIjld05DfAwAnERD5L2CZCZAuWtHIvZBVRkpm03ZBWL4BNGhE2w99pnPiab5XIKTJFRqKdDJb85mZC8iTbiPYJZCVi2cZBp0Bo2ZC79AauRDOjcEaluSzutYsgZDZD',
  verifyToken: 'FAO3iIRvJIflLGGBa12nP5hH9eARyLjV',
  appSecret: '8963b5ca6c1140029e1fbe5128491558'
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
});

bot.start();



app.listen(PORT,(err)=>{
    console.log("server listening on port :"+PORT);
})