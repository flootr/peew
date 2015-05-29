"use strict";

// The countries.xml file is copied from https://docs.python.org/3.4/library/xml.etree.elementtree.html.

var fs = require('fs');
var path = require('path');

var Tree = require('../lib').Tree;
var xmlTree = new Tree();

var xmlString = fs.readFileSync(path.resolve(__dirname, 'countries.xml'), 'utf8');

xmlTree.parse(xmlString)
    .then(function (res) {
        var countries = res.findAll('country');
        countries.forEach(function (country) {
            if (country.attrs.name === 'Panama') {
                console.log('Yeah, there is Panama! Look:\n', country);
            }
        });
    });