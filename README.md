# saml
parses xml using [sax.js](https://github.com/isaacs/sax-js).

Call it like `[ˈzɛml̩]`. Do not mix up with 'Semmel'.

[![Build Status](https://travis-ci.org/flootr/saml.svg?branch=master)](https://travis-ci.org/flootr/saml) [![Dependency Status](https://david-dm.org/flootr/saml.svg)](https://david-dm.org/flootr/saml) [![devDependency Status](https://david-dm.org/flootr/saml/dev-status.svg)](https://david-dm.org/flootr/saml#info=devDependencies)

**Note:** This project is under active development. API may change.

## API

### Parser

This is the parser which can be used to parse xml into proper Javascript object. Initialize the parser like so:

```javascript
var Parser = require('saml').Parser();
var xmlParser = new Parser()
```

#### Parser.parse()

```javascript
xmlParser.parse('some xml')
	.then(function (res) {
	// .. do something with the parsed xml
	});
```

### Element

Any xml object is transformed into a so-called 'Element'. This class holds a JavaScript Objects which contain a name, attributes, children and so on. After using the parser you will get an Object which is an instance of Element.

The Element class provides you some useful methods that help you find children, iterate over children and so on.

**Note:** You can use this class to build an xml-like structure using JS objects but you will not be able to transform it to pure XML as this is not supported yet (but is considered as *nice to have* feature and will be supported in the future).

#### Element.root()

Returns the root of the Element tree.

#### Element.up()

Returns the parent Element of the current Element.

#### Element.get(key)

Returns the Elements attribute named *key*.

#### Element.setAttributes(Object)

Use an object to set attributes on the current Element.

#### Element.addChildNode(Element)

Adds the given Element to the children of the current Element. **Note:** This returns the added child, not the current Element!

#### Element.setText(String)

Sets the given string as text node to the current element.

#### Element.find(match)

`find()` finds the first child with a name matching *match*.

#### Element.findAll(match)

`findAll()` finds all children wit a name matching *match*.

#### Element.iter(match)

Returns a generator which makes it possible to iterate recursively over the whole tree.

**Important notice:** This feature is implemented already but commented out until node.js supports generators without a `--harmony` flag.
If you want to use this feature get a copy of **saml** and remove the comment slashes yourself.

#### Element.treeFind(match)

`treeFind()` returns any occurrence of `Element.name === 'match'` on the whole tree, starting from the current Element.

#### Element.isElement()

Returns true if Element is really an instance of Element.
