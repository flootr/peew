"use strict";

var expect = require('chai').expect;
var Element = require('../../lib').Element;

describe('Element', function () {

    var newElement;

    beforeEach(function () {
        newElement = new Element('beautifulNewElement', {});
    });

    describe('new Element()', function () {
        it('should throw an error if there is no given name', function () {
            var t;
            try {
                t = new Element();
            } catch (error) {
                expect(error).to.be.instanceof(Error);
                expect(error.message).to.equal('Failed due to missing \'name\'');
            }
        });

        it('should return an instance of Element', function () {
            expect(newElement).to.be.instanceof(Element);
            expect(newElement).to.contain.all.keys(['attrs', 'children', 'name', 'parent']);
        });
    });

    describe('setAttributes()', function () {
        it('should set the proper attributes', function () {
            newElement.setAttributes({'type': 'PseudoObject', 'charset': 'utf8'});
            expect(newElement.attrs).to.contain.all.keys(['type', 'charset']);
            expect(newElement.attrs.type).to.equal('PseudoObject');
            expect(newElement.attrs.charset).to.equal('utf8');
        });
    });

    describe('root()', function () {
        it('should return the correct root Element', function () {
            var newSubElement = new Element('beautifulNewSubElement', {});
            newElement.addChildNode(newSubElement);
            expect(newElement.children).to.be.instanceof(Array);
            expect(newSubElement.root()).to.equal(newElement);
        });
    });

    describe('parent()', function () {
        it('should return the correct parent Element', function () {
            var newSubElement = new Element('beautifulNewSubElement', {});
            newElement.addChildNode(newSubElement);
            expect(newSubElement.up()).to.equal(newElement);
            expect(newElement.up()).to.equal(newElement);
        });
    });

    describe('addChildNode()', function () {
        it('should set the correct number of child nodes', function () {
            var elements = [];
            for (var i = 0; i < 23; i++) {
                elements.push(new Element('beautifulElementNo' + i, {}));
            }
            elements.map(function (element) {
                newElement.addChildNode(element);
            });

            expect(newElement.children).to.be.instanceof(Array);
            expect(newElement.children).to.have.length(23);
            newElement.children.map(function (child) {
                expect(elements).to.contain(child);
            });
        });
    });

    describe('treeFind()', function () {
        it('should return the proper Elements', function () {
            newElement.addChildNode(new Element('beautifulSubNode', {}));
            newElement.find('beautifulSubNode').addChildNode(new Element('beautifulSubSubNode', {}));
            var results = newElement.treeFind('beautifulSubSubNode');
            expect(results).to.be.instanceof(Array);
            expect(results).to.have.length(1);
            expect(results[0].name).to.eql('beautifulSubSubNode');
        });
    });

    describe('keys()', function () {
        it('should return the elements attribute names', function () {
            var attributes = {
                values: 3,
                wow: 'hammer'
            };
            newElement.setAttributes(attributes);
            expect(newElement.keys()).to.eql(Object.keys(attributes));
        });
    });
});