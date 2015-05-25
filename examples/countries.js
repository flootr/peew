"use strict";

var fs = require('fs');
var path = require('path');

var Parser = require('../lib').Parser;
var xmlParser = new Parser();

var xmlString = fs.readFileSync(path.resolve(__dirname, 'countries.xml'), 'utf8');

xmlParser.parse(xmlString)
    .then(function (res) {
        var countries = res.findAll('country');
        countries.forEach(function (country) {
            if (country.attrs.name === 'Panama') {
                console.log('Yeah, there is Panama! Look:\n', country);
            }
        });
    });