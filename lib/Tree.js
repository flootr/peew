"use strict";

var fs = require('fs');
var path = require('path');
var sax = require('sax');

var Element = require('./Element');

/**
 * Creates a new Parser
 *
 * @param {Object} config
 * @constructor
 */
function Tree(config) {
    // TODO: use config and hand over to saxParser
    this.saxParser = sax.parser(true, {trim: true});
    this.root = null;
}

/**
 *
 *
 * @param {String} xmlString
 * @returns {Promise}
 */
Tree.prototype.parse = function (xmlString) {
    var tree;
    var self = this;

    return new Promise(function (resolve, reject) {
        self.saxParser.onopentag = function (node) {
            var child = new Element(node.name, node.attributes);
            if (!tree) {
                tree = child;
            } else {
                tree = tree.addChildNode(child);
            }
        };

        self.saxParser.onclosetag = function (name) {
            if (name === tree.name) {
                if (tree.parent) {
                    tree = tree.parent;
                }
            }
        };

        self.saxParser.ontext = function (text) {
            tree.setText(text);
        };

        self.saxParser.onend = function () {
            if(tree !== undefined) {
                self.root = tree;
            }
            resolve(tree);
        };

        self.saxParser.onerror = function (err) {
            reject(err);
        };

        self.saxParser.write(xmlString).end();
    });
};

/**
 * Return the root element.
 *
 * @returns {Element}
 */
Tree.prototype.getRoot = function () {
    return this.root;
};

/**
 * Return whether element is an instance of Element
 *
 * @param {Element} element
 * @returns {boolean}
 */
Tree.prototype.isElement = function(element) {
    return element instanceof Element;
};

module.exports = Tree;