# peew
parses xml using [sax.js](https://github.com/isaacs/sax-js).

[![Build Status](https://travis-ci.org/flootr/peew.svg?branch=master)](https://travis-ci.org/flootr/peew) [![Dependency Status](https://david-dm.org/flootr/peew.svg)](https://david-dm.org/flootr/peew) [![devDependency Status](https://david-dm.org/flootr/peew/dev-status.svg)](https://david-dm.org/flootr/peew#info=devDependencies)

**Note:** This project is under active development. API may change. Requires minimum Node.js version 4.2.1.

## API

### Parser

This is the parser which can be used to parse xml into proper Javascript object. Initialize the parser like so:

```javascript
var Parser = require('peew').Parser();
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

#### Element.keys()

Returns the Elements attribute names.

#### Element.setAttributes(Object)

Use an object to set attributes on the current Element.

#### Element.addChildNode(Element)

Adds the given Element to the children of the current Element. **Note:** This returns the added child, not the current Element!

#### Element.setText(String)

Sets Element.text to the text which occur before the first subelement.

#### Element.find(match)

`find()` finds the first child with a name matching *match*.

#### Element.findAll(match)

`findAll()` finds all children wit a name matching *match*.

#### Element.findText(match)

`findText()` finds the text for the first direct child of the current element with name matching 'name'

#### Element.iter(match)

Returns a generator which makes it possible to iterate recursively over the whole tree.

**Important notice:** This feature is implemented already but commented out until node.js supports generators without a `--harmony` flag.
If you want to use this feature get a copy of **peew** and remove the comment slashes yourself.

#### Element.treeFind(match)

`treeFind()` returns the first Element with the name matching *match*, searching on the whole tree from the current Element.

#### Element.treeFindAll(match)

`treeFindAll()` returns any occurrence of `Element.name === 'match'` on the whole tree, starting from the current Element.

#### Element.isElement()

Returns true if Element is really an instance of Element.
