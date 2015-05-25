"use strict";

/**
 * Creates a new Element
 *
 * @param {String} name
 * @param {Object} attributes
 * @constructor
 */
function Element(name, attributes) {
    if (!name) {
        throw new Error('Failed due to missing \'name\'');
    }
    attributes = attributes || {};
    this.name = name;
    this.parent = null;
    this.children = [];
    this.setAttributes(attributes);
}

/**
 * Returns the root Element
 *
 * @returns {Element}
 */
Element.prototype.root = function () {
    if (this.parent) {
        return this.parent.root();
    }

    return this;
};

/**
 * Returns the parent Element if there exists one
 *
 * @returns {Element}
 */
Element.prototype.up = function () {
    if (this.parent) {
        return this.parent;
    }

    return this;
};

/**
 *
 *
 * @param attributes
 */
Element.prototype.setAttributes = function (attributes) {
    this.attrs = {};
    var self = this;

    Object.keys(attributes).forEach(function (key) {
        self.attrs[key] = attributes[key];
    });
};

/**
 * Adds a child node
 *
 * @param {Element} child
 * @returns {Element}
 */
Element.prototype.addChildNode = function (child) {
    this.children.push(child);
    if (typeof child === 'object') {
        child.parent = this;
    }
    return child;
};

/**
 * Adds a text node
 *
 * @param {String} text
 * @returns {Element}
 */
Element.prototype.setText = function (text) {
    this.children.push(text);
    return this;
};

/**
 * Find all children with name matching 'match'
 * which are direct children of current element
 *
 * @param {String} match
 * @returns {Array.<Element>}
 */
Element.prototype.findAll = function (match) {
    return this.children.filter(function (child) {
        return child.name === match;
    });
};

/**
 * Find the first direct child of the current element
 * with name matching 'match'
 *
 * @param {String} match
 * @returns {Element}
 */
Element.prototype.find = function (match) {
    return this.children.filter(function (child) {
        return child.name === match;
    })[0];
};

/**
 * Return whether the current element is an instance of Element
 *
 * @returns {boolean}
 */
Element.prototype.isElement = function () {
    return this instanceof Element;
};

///**
// * Return a generator to find all children with name matching 'match' recursively
// *
// * IMPORTANT NOTICE
// * This feature is not production ready yet,
// * because we make use of es6 generators
// *
// * @experimental es6 generators
// *
// * @param {String} match
// * @returns {Generator}
// */
//Element.prototype.iter = function* (match) {
//    var self = this;
//    if (match === undefined || self.name === match) {
//        yield self;
//    }
//    for (let child of self.children) {
//        if (child instanceof Element) {
//            yield* child.iter(match);
//        }
//    }
//};

module.exports = Element;