"use strict";

/*eslint-disable max-nested-callbacks */

const expect = require("unexpected");
const Element = require("../../lib").Element;

describe("Element", () => {
    let newElement;

    beforeEach(() => {
        newElement = new Element("beautifulNewElement", {});
    });

    describe("new Element()", () => {
        it("should throw an error if there is no given name", () => {
            expect(() => new Element(), "to throw", "Failed due to missing \"name\"");
        });

        it("should return an instance of Element", () => {
            expect(newElement, "to be an", Element);
            expect(newElement, "to have keys", ["attrs", "children", "name", "parent"]);
        });
    });

    describe("setAttributes()", () => {
        it("should set the proper attributes", () => {
            newElement.setAttributes({ type: "PseudoObject", charset: "utf8" });
            expect(newElement.attrs, "to have keys", ["type", "charset"]);
            expect(newElement.attrs.type, "to equal", "PseudoObject");
            expect(newElement.attrs.charset, "to equal", "utf8");
        });
    });

    describe("root()", () => {
        it("should return the correct root Element", () => {
            const newSubElement = new Element("beautifulNewSubElement", {});

            newElement.addChildNode(newSubElement);

            expect(newElement.children, "to be an", Array);
            expect(newSubElement.root(), "to equal", newElement);
        });
    });

    describe("parent()", () => {
        it("should return the correct parent Element", () => {
            const newSubElement = new Element("beautifulNewSubElement", {});

            newElement.addChildNode(newSubElement);
            expect(newSubElement.up(), "to equal", newElement);
            expect(newElement.up(), "to equal", newElement);
        });
    });

    describe("addChildNode()", () => {
        it("should set the correct number of child nodes", () => {
            const elements = [];

            for (let i = 0; i < 23; i++) {
                elements.push(new Element("beautifulElementNo" + i, {}));
            }

            elements.map((element) => {
                newElement.addChildNode(element);
            });

            expect(newElement.children, "to be an", Array);
            expect(newElement.children, "to have length", 23);
            newElement.children.map((child) => {
                expect(elements, "to contain", child);
            });
        });
    });

    describe("treeFindAll()", () => {
        it("should return the proper Elements", () => {
            newElement.addChildNode(new Element("beautifulSubNode", {}));
            newElement.find("beautifulSubNode").addChildNode(new Element("beautifulSubSubNode", {}));

            const results = newElement.treeFindAll("beautifulSubSubNode");

            expect(results, "to be an", Array);
            expect(results, "to have length", 1);
            expect(results[0].name, "to equal", "beautifulSubSubNode");
        });
    });

    describe("keys()", () => {
        it("should return the elements attribute names", () => {
            const attributes = {
                values: 3,
                wow: "hammer"
            };

            newElement.setAttributes(attributes);
            expect(newElement.keys(), "to equal", Object.keys(attributes));
        });
    });

    describe("findText()", () => {
        it("should return the text of the first subelement", () => {
            const SubElement = new Element("beautifulSubElement", {});

            SubElement.setText("wonderful");
            newElement.addChildNode(SubElement);
            expect(newElement.findText("beautifulSubElement"), "to equal", "wonderful");
        });
    });

    describe("treeFind()", () => {
        it("should return the first matching element", () => {
            newElement.addChildNode(new Element("beautifulSubNode", {}));
            newElement.find("beautifulSubNode").addChildNode(new Element("beautifulSubSubNode", {}));

            const results = newElement.treeFind("beautifulSubSubNode");

            expect(results, "to be an", Element);
            expect(results.name, "to equal", "beautifulSubSubNode");
        });
    });
});