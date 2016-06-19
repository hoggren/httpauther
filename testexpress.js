var express = require('express');
var app = express();
var httpauther = require('httpauther')('admin pages','admin','5f4dcc3b5aa765d61d8327deb882cf99');

var http = require('http');

app.get('/', function(req, res) {
    res.send('Not protected');
});

app.get('/admin', httpauther, function(req, res) {
    res.send('protected');
});

console.log('Starting Express web server on port 8080...');
app.listen(8080);
console.log('Done');

console.log('** Test starting **');

console.log('1. GET / - should return status code 200:');
http.get('http://localhost:8080/', function(res) {
    console.log('    Status code: ' + res.statusCode);
    res.resume();

    console.log('2. GET /admin with no credentials - should return status code 401:');
    http.get('http://localhost:8080/admin', function(res) {
        console.log('    Status code: ' + res.statusCode);
        res.resume();

        console.log('3. GET /admin with correct credentials - should return status code 200:');
        var req = http.request(
            {
                'host': 'localhost',
                'port': '8080',
                'path': '/admin',
                'auth': 'admin:password'
            }
            , function(res) {
            console.log('    Status code: ' + res.statusCode);
            res.resume();

            console.log('3. GET /admin with incorrect credentials - should return status code 401:');
            var req = http.request(
                {
                    'host': 'localhost',
                    'port': '8080',
                    'path': '/admin',
                    'auth': 'admin:notcorrect'
                }
                , function(res) {
                console.log('    Status code: ' + res.statusCode);
                res.resume();

                process.exit();
            });

            req.end();
        });

        req.end();
    });
});
