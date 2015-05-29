"use strict";

var fs = require('fs');
var path = require('path');
var inspect = require('util').inspect;

var Tree = require('../lib').Tree;
var xmlTree = new Tree();

var xmlResponse = fs.readFileSync(path.resolve(__dirname, 'response.xml'), 'utf8');

xmlTree.parse(xmlResponse)
    .then(function (res) {
        console.log(inspect(res, {depth: null, colors: true}));
    })
    .catch(function (err) {
        console.error(err);
    });