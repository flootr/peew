# peew
parses xml using [sax.js](https://github.com/isaacs/sax-js).

[![Build Status](https://travis-ci.org/flootr/peew.svg?branch=master)](https://travis-ci.org/flootr/peew) [![Dependency Status](https://david-dm.org/flootr/peew.svg)](https://david-dm.org/flootr/peew) [![devDependency Status](https://david-dm.org/flootr/peew/dev-status.svg)](https://david-dm.org/flootr/peew#info=devDependencies)

**Note:** This project is **not** under active development. Currently there are no plans to continue on this project from my side.

## API

### Tree

Tree can be used to parse XML. Initialize the Tree like so:

```js
const Tree = require('peew').Tree;

const config = {
    strict: true,
    // sax: [sax.js settings]
};

const xmlTree = new Tree(config);
```

The Tree holds a root element and therefore the XML hierarchy and provides methods to operate on this tree.

#### Tree.parse(String)

```javascript
xmlTree.parse('some xml')
	.then(function (res) {
	   // .. do something with the parsed xml
	});
```

#### Tree.getRoot()

Return the root element of the tree.

#### Tree.isElement(element)

Return whether *element* is an instance of Element.

### Element

Any xml object is transformed into a so-called 'Element'. This class holds a JavaScript Objects which contain a name, attributes, children and so on. After using the Tree you will get an Object which is an instance of Element.

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

#### Element.treeFind(match)

_Deprecated_: Use `Element.iter()`.

`treeFind()` returns the first Element with the name matching *match*, searching on the whole tree from the current Element.

#### Element.treeFindAll(match)

_Deprecated_: Use `Element.iter()`.

`treeFindAll()` returns any occurrence of `Element.name === 'match'` on the whole tree, starting from the current Element.
