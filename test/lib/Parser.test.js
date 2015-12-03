"use strict";

/*eslint-disable max-nested-callbacks */

const expect = require("unexpected");
const Element = require("../../lib").Element;
const Parser = require("../../lib").Parser;
const xmlParser = new Parser();

describe("Parser", () => {
    describe("parse()", () => {
        it("should throw an error if an xml tag has a closed but no starting tag", () => {
            const xmlString = "<opening></missing></opening>";
            const promise = xmlParser.parse(xmlString);

            return expect(promise, "to be rejected");
        });

        it("should create a proper js object", () => {
            const xmlString = "<opening src=\"happening\"></opening>";
            const expectedObject = new Element("opening", { src: "happening" });
            const promise = xmlParser.parse(xmlString);

            return expect(promise, "to be fulfilled with", expectedObject);
        });
    });
});
