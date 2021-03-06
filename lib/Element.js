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
        throw new Error("Failed due to missing \"name\"");
    }

    // It should be ok if no attributes are to set
    attributes = attributes || {};

    /**
     * Object of the Element's attributes
     */
    this.attrs = {};

    /**
     * Text before the first sub-element
     */
    this.text = null;

    /**
     * The Element's name
     */
    this.name = name;

    /**
     * The Element's parent Element
     */
    this.parent = null;

    /**
     * Element's children.
     * All children are an instance of Element
     */
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
 * Returns the Elements attribute named *key*
 *
 * @param {String} key
 * @returns {String|undefined}
 */
Element.prototype.get = function (key) {
    if (key in this.attrs) {
        return this.attrs[key];
    }
};

/**
 * Returns the Elements attribute names
 *
 * @returns {Array}
 */
Element.prototype.keys = function () {
    return Object.keys(this.attrs);
};

/**
 *
 *
 * @param {Array} attributes
 */
Element.prototype.setAttributes = function (attributes) {
    const self = this;

    Object.keys(attributes).forEach((key) => {
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
    if (typeof child === "object") {
        child.parent = this;
    }
    return child;
};

/**
 * Adds a text node
 *
 * @param {String} text
 */
Element.prototype.setText = function (text) {
    if (this.children.length === 0) {
        this.text = text;
    }
};

/**
 * Find all children with name matching 'match'
 * which are direct children of current element
 *
 * @param {String} match
 * @returns {Array.<Element>}
 */
Element.prototype.findAll = function (match) {
    return this.children.filter((child) => {
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
    return this.children.filter((child) => {
        return child.name === match;
    })[0];
};

/**
 * Find the text for the first direct child of
 * the current element with name matching 'name'
 *
 * @param {String} match
 * @returns {String|null}
 */
Element.prototype.findText = function (match) {
    return this.children.filter((child) => {
        return child.name === match;
    })[0].text;
};

/**
* Return a generator to find all children with name matching 'match' recursively
*
* @param {String} match
* @returns {Generator}
*/
Element.prototype.iter = function* (match) {
    const self = this;

    if (typeof match === "undefined" || self.name === match) {
        return yield self;
    }

    for (const child of self.children) {
        if (child instanceof Element) {
            return yield* child.iter(match);
        }
    }
};

/**
 * Find the first matching sub-element by tag name
 *
 * @deprecated
 * @param {String} match
 * @returns {Element}
 */
Element.prototype.treeFind = function (match) {
    return this.treeFindAll(match)[0];
};

/**
 * Find all matching sub-elements by tag name
 *
 * @deprecated
 * @param {String} match
 * @returns {Array}
 */
Element.prototype.treeFindAll = function (match) {
    const results = [];

    if (this.name === match) {
        results.push(this);
    }

    function look(children, results) {
        children.map((child) => {
            if (child instanceof Element && child.name === match) {
                results.push(child);
            }
            if (child instanceof Element && child.children.length > 0) {
                look(child.children, results);
            }
        });
    }

    look(this.children, results);
    return results;
};

module.exports = Element;