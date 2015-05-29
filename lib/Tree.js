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
    // TODO: use config
    this.saxParser = sax.parser(true, {trim: true});
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
            resolve(tree);
        };

        self.saxParser.onerror = function (err) {
            reject(err);
        };

        self.saxParser.write(xmlString).end();
    });

};

module.exports = Tree;