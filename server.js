'use strict';

const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8012;
app.use(express.static(__dirname));
var bodyParser = require('body-parser');
var CSV = require('csv-lite');


//画像表示
app.get('/view', (req, res) => {
    fs.readdir('./img', function(err, files){
        if (err) throw err;
        //console.log(files);
        res.render("view.ejs", {
      	    title: 'Knowledge',
            imgList: files
        })
    });
    // res.sendFile('./index.ejs');
});

//画像表示
app.get('/', (req, res) => {
    res.render("index.ejs", {
  	    title: 'Knowledge'
    })
});
app.get('/schedule', (req, res) => {
    res.render("schedule.ejs", {
  	    title: 'Knowledge'
    })
});
app.get('/about', (req, res) => {
    res.render("about.ejs", {
  	    title: 'Knowledge'
    })
});


//画像アップロードを受け付け
app.post('/', (req, res) => {
    let buffers = [];
    let cnt = 0;

    req.on('data', (chunk) => {
        buffers.push(chunk);
        console.log(++cnt);
    });

    req.on('end', () => {
        console.log(`[done] Image upload`);
        req.rawBody = Buffer.concat(buffers);
        //書き込み
        fs.writeFile('./img.jpeg', req.rawBody, 'utf-8',(err) => {
            if(err) return;
	    console.log(`[done] Image save`);
        });
    });
});




//data受付
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/csv', function(req, res) {
  var data = CSV.readFileSync('data.csv');

  var i=1;
  var j=1;

  for (var key in req.body) {
    data[i][j] = req.body[key];
    j = j + 1;
    if(j == 5){
      j = 1;
      i = i + 1;
    }
  }
  CSV.writeFileSync('data.csv',data);
  console.log(data);
  res.send("更新完了");
　//res.render("./index.ejs");

});


app.listen(PORT);
