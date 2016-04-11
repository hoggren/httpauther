# httpauther
A middleware for [express.js](http://expressjs.com) to use HTTP basic authentication to protect your web.

### Usage
Enter your desired username and password when calling httpauther. You must enter your password hashed with MD5.

**Terminal:** `npm install httpauther --save`  
**Your express-app:** `var httpauther = require('httpauther')('realm', 'usr', 'md5 hash');`

### Example code
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

**This example is supplied in the package.**

### Thanks to
>>[node.js](www.nodejs.org)  
>>[npm](www.npmjs.com)  
>>[Dillinger](www.dillinger.io)  
