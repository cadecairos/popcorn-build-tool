/* Describe popcorn-js modules/plugins as a JS Object
 *
 * isShim: a shim file will be included before popcorn.js
 * path: path to the module file
 * depends: name of a module which must be loaded before this module is loaded
 *
 **/

module.exports = {
  "regularModule": {
    "path": "path/to/module.js"
  },
  "shimModule": {
    "isShim": true,
    "path": "path/to/shim.js"
  }
  "moduleWithDependency": {
    "depends": "regularModule",
    "path": "the/path/to/module.js"
  }
};
