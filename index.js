var crypto = require('crypto');

module.exports = init;

var realm;
var usr;
var pwd;

//5f4dcc3b5aa765d61d8327deb882cf99 = 'password'

function init(realm, usr, pwd) {

    typeof realm !== 'string' ? realm = 'protected page'                    : this.realm = realm;
    typeof usr   !== 'string' ? usr   = 'username'                          : this.usr = usr;
    typeof pwd   !== 'string' ? pwd   = '5f4dcc3b5aa765d61d8327deb882cf99'  : this.pwd = pwd;

    return function httpauther(req, res, next) {
        var headerAuth = req.get('Authorization');

        if(!headerAuth)
            return sendHeader(res);

        headerAuth = headerAuth.split(' ');

        if(headerAuth.length < 2)
            return sendHeader(res);

        var buf = new Buffer(headerAuth[1],'base64');
        var credentials = buf.toString().split(':');

        if(credentials < 2)
            return sendHeader(res);

        if(credentials[0] !== usr || !checkHash(credentials[1]))
            return sendHeader(res);

        next();
    }
}

function sendHeader(res) {
    res.set('WWW-Authenticate','Basic realm="'+realm+'"');
    res.status(401).end();
}

function checkHash(password) {
    var md5 = crypto.createHash('md5').update(password);
    var hash = md5.digest('hex');
    return hash == this.pwd;
}
