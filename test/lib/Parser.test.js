"use strict";

var expect = require('chai').expect;

var Element = require('../../lib').Element;
var Parser = require('../../lib').Parser;
var xmlParser = new Parser();

describe('Parser', function () {

    describe('parse()', function () {

        it('should throw an error if an xml tag has a closed but no starting tag', function () {
            var xmlString = '<opening></missing></opening>';
            return xmlParser.parse(xmlString)
                .catch(function (err) {
                    expect(err).to.be.instanceof(Error);
                });
        });

        it('should create a proper js object', function () {
            var xmlString = '<opening src="happening"><happening></happening></opening>';
            var expectedObject = new Element('opening', {src: 'happening'}).addChildNode(new Element('happening')).root();

            return xmlParser.parse(xmlString)
                .then(function (res) {
                    expect(res).to.eql(expectedObject);
                });

        })

    });

});