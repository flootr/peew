"use strict";

/*eslint-disable max-nested-callbacks */

const expect = require("chai").expect;

const Element = require("../../lib").Element;
const Parser = require("../../lib").Parser;
const xmlParser = new Parser();

describe("Parser", () => {
    describe("parse()", () => {
        it("should throw an error if an xml tag has a closed but no starting tag", () => {
            const xmlString = "<opening></missing></opening>";

            return xmlParser.parse(xmlString)
                .catch((err) => {
                    expect(err).to.be.instanceof(Error);
                });
        });

        it("should create a proper js object", () => {
            const xmlString = "<opening src=\"happening\"><happening></happening></opening>";
            const expectedObject = new Element("opening", { src: "happening" }).addChildNode(new Element("happening")).root();

            return xmlParser.parse(xmlString)
                .then((res) => {
                    expect(res).to.eql(expectedObject);
                });
        });
    });
});
