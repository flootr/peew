## 0.3.0 (2015-12-3)

- Tree:
  - Rename `Parser` to `Tree`
  - `Tree` now accepts an [sax.js configuration object](https://github.com/isaacs/sax-js) with `config.sax`
  - Add `Tree.getRoot()` and `Tree.isElement()`
- Element:
  - Remove `Element.isElement()`
  - Deprecate `Element.treeFind()` and `Element.treeFindAll()`
  - Add `Element.iter()` by default