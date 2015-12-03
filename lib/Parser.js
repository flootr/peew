"use strict";

const sax = require("sax");
const Element = require("./Element");

/**
 * Creates a new Parser
 *
 * @param {Object} config
 * @constructor
 */
function Parser(config) {
    // TODO: use config
    this.saxParser = sax.parser(true, { trim: true });
}

/**
 *
 *
 * @param {String} xmlString
 * @returns {Promise}
 */
Parser.prototype.parse = function (xmlString) {
    let tree;
    const self = this;

    return new Promise((resolve, reject) => {
        self.saxParser.onopentag = function (node) {
            const child = new Element(node.name, node.attributes);

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
            return reject(err);
        };

        self.saxParser.write(xmlString).end();
    });
};

module.exports = Parser;