var express = require('express');
var app = express();
var httpauther = require('httpauther')('admin pages','admin','5f4dcc3b5aa765d61d8327deb882cf99');


app.get('/', function(req, res) {
    res.send('not protected at all');
});

app.get('/admin', httpauther, function(req, res) {
    res.send('admin pages!');
});

app.listen(8080);
