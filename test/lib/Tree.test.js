"use strict";

/*eslint-disable max-nested-callbacks */

const expect = require("unexpected");
const Element = require("../../lib").Element;
const Tree = require("../../lib").Tree;

describe("Tree", () => {
    let xmlTree;

    beforeEach(() => {
        xmlTree = new Tree();
    });

    describe("parse()", () => {
        it("should throw an error if an xml tag has a closed but no starting tag", () => {
            const xmlString = "<opening></missing></opening>";
            const promise = xmlTree.parse(xmlString);

            return expect(promise, "to be rejected");
        });

        it("should create a proper js object", () => {
            const xmlString = "<opening src=\"happening\"></opening>";
            const expectedObject = new Element("opening", { src: "happening" });
            const promise = xmlTree.parse(xmlString);

            return expect(promise, "to be fulfilled with", expectedObject);
        });
    });

    describe("getRoot()", () => {
        it("should return the root element of the tree", () => {
            const xmlString = "<rootie><subOne></subOne><subTwo></subTwo></rootie>";

            return xmlTree.parse(xmlString)
                .then(() => {
                    expect(xmlTree.getRoot(), "to be an", Element);
                    expect(xmlTree.getRoot().name, "to equal", "rootie");
                    expect(xmlTree.getRoot().parent, "to be", null);
                });
        });

        it("should return null, if no root element exists", () => {
            const xmlString = "";

            return xmlTree.parse(xmlString)
                .then(() => {
                    expect(xmlTree.getRoot(), "to be", null);
                });
        });
    });

    describe("isElement(element)", () => {
        it("should return true if element is an instance of Element", () => {
            const xmlString = "<rootieRoot><subOne></subOne></rootieRoot>";

            return xmlTree.parse(xmlString)
                .then(() => {
                    return expect(xmlTree.isElement(xmlTree.getRoot()), "to be", true);
                });
        });

        it("should return false if element is not an instance of Element", () => {
            const xmlString = "";

            return xmlTree.parse(xmlString)
                .then(() => {
                    return expect(xmlTree.isElement(xmlTree.getRoot()), "to be", false);
                });
        });
    });
});
