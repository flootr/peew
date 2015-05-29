"use strict";

var expect = require('chai').expect;

var Element = require('../../lib').Element;
var Tree = require('../../lib').Tree;

describe('Tree', function () {

    var xmlTree;

    beforeEach(function () {
        xmlTree = new Tree();
    });

    describe('parse()', function () {

        it('should throw an error if an xml tag has a closed but no starting tag', function () {
            var xmlString = '<opening></missing></opening>';
            return xmlTree.parse(xmlString)
                .catch(function (err) {
                    expect(err).to.be.instanceof(Error);
                });
        });

        it('should create a proper js object', function () {
            var xmlString = '<opening src="happening"><happening></happening></opening>';
            var expectedObject = new Element('opening', {src: 'happening'}).addChildNode(new Element('happening')).root();

            return xmlTree.parse(xmlString)
                .then(function (res) {
                    expect(res).to.eql(expectedObject);
                });

        })
    });

    describe('getRoot()', function () {

        it('should return the root element of the tree', function () {
            var xmlString = '<rootie><subOne></subOne><subTwo></subTwo></rootie>';
            return xmlTree.parse(xmlString)
                .then(function () {
                    expect(xmlTree.getRoot()).to.be.instanceof(Element);
                    expect(xmlTree.getRoot().name).to.eql('rootie');
                    expect(xmlTree.getRoot().parent).to.eql(null);
                });
        });

        it('should return null, if no root element exists', function () {
            var xmlString = '';
            return xmlTree.parse(xmlString)
                .then(function () {
                    expect(xmlTree.getRoot()).to.eql(null);
                });
        });
    });

    describe('isElement(element)', function () {
        it('should return true if element is an instance of Element', function () {
            var xmlString = '<rootieRoot><subOne></subOne></rootieRoot>';
            return xmlTree.parse(xmlString)
                .then(function () {
                    expect(xmlTree.isElement(xmlTree.getRoot())).to.be.true;
                });
        });

        it('should return false if element is not an instance of Element', function () {
            var xmlString = '';
            return xmlTree.parse(xmlString)
                .then(function () {
                    expect(xmlTree.isElement(xmlTree.getRoot())).to.be.false;
                });
        });
    });

});