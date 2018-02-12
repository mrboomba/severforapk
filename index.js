var express  = require('express');
var app      = express();
var port     = 3000;
// var index    = require('./routes/index')
var bodyParser = require('body-parser');
var fs = require('fs')
var path = require('path');
var config = require('./config/path')



app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use('/update',function(req,res){
      var json = path.join(__dirname,'./json/version.json');
      var obj = JSON.parse(fs.readFileSync(json, 'utf8'));
      res.json(obj);
});

app.use('/apk',function(req,res){
  var apkFile = config.apk;
if(!fs.existsSync(apkFile))
return res.status(404).send('Sorry no APKs here     '+apkFile);
res.download(apkFile);
});

app.listen(port,function(){
	console.log('Magic is happend on port 3000');
})
