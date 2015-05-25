"use strict";

var fs = require('fs');
var path = require('path');
var inspect = require('util').inspect;

var Parser = require('../lib').Parser;
var xmlParser = new Parser();

var xmlResponse = fs.readFileSync(path.resolve(__dirname, 'caldavResponse.xml'), 'utf8');

xmlParser.parse(xmlResponse)
    .then(function (res) {
        console.log(inspect(res));
    });