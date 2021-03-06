# QuidPHP/JavaScript
[![Release](https://img.shields.io/github/v/release/quidphp/javascript)](https://packagist.org/packages/quidphp/javascript)
[![License](https://img.shields.io/github/license/quidphp/javascript)](https://github.com/quidphp/javascript/blob/master/LICENSE)
[![Code Size](https://img.shields.io/github/languages/code-size/quidphp/javascript)](https://github.com/quidphp/javascript)

## About
**QuidPHP/JavaScript** is a JavaScript module useful for both the front-end & back-end. The scripts are compatible within the browser or Node.

## License
**QuidPHP/JavaScript** is available as an open-source package under the [MIT license](LICENSE).

## Documentation
**QuidPHP/Javascript** documentation is available at [QuidPHP/Docs](https://github.com/quidphp/docs).

## Installation
**QuidPHP/Javascript** can be easily installed with [NPM](https://www.npmjs.com/package/quidphp-javascript).
``` bash
$ npm install quidphp-javascript
```
Once installed, the package will be available within your *node_modules* folder.

## Dependency
**QuidPHP/JavaScript** has the following dependencies:
- [laravel-mix/laravel-mix](https://github.com/laravel-mix/laravel-mix) - The power of webpack, distilled for the rest of us
- [scottcharlesworth/laravel-mix-polyfill](https://github.com/scottcharlesworth/laravel-mix-polyfill) - Quid\Main - A Laravel Mix extension to include polyfills by using Babel, core-js, and regenerator-runtime

All dependencies will be resolved by using the [NPM](https://www.npmjs.com) installation process.

## Requirement
**QuidPHP/Javascript** requires Node 15+ or any modern browser (not Internet Explorer).
    
## Comment
**QuidPHP/JavaScript** code is commented and all methods are explained (in French).

## Overview
**QuidPHP/JavaScript** contains one entry file.
- [index](index.js) - Entry file for the module

### Source
**QuidPHP/JavaScript** contains 21 JavaScript files. Here is an overview:
- [arr](src/arr.js) - Script with some objects related to array manipulation
- [arrLike](src/arrLike.js) - Script with some functions related to array like management
- [bool](src/bool.js) - Methods for bool primitive type
- [datetime](src/datetime.js) - Script with functions related to date and time
- [debug](src/debug.js) - Script with functions related to debugging
- [env](src/env.js) - Methods related to javascript environment
- [factory](src/factory.js) - Script with a method to create the objects with prototype
- [func](src/func.js) - Script with methods related to functions
- [html](src/html.js) - Script containing event listeners functions for target elements
- [integer](src/integer.js) - Methods related to integer numbers
- [json](src/json.js) - Script with methods related to json format
- [nav](src/nav.js) - Script with helper functions related to navigation and pagination
- [num](src/num.js) - Script with functions related to numbers
- [obj](src/obj.js) - Script with a set of helper functions related to objects
- [pojo](src/pojo.js) - Script with a set of helper functions related to plain objects
- [scalar](src/scalar.js) - Script with functions related to scalar values
- [str](src/str.js) - Script with a set of helper functions related to strings
- [testSuite](src/testSuite.js) - Script with a method to run a suite of tests
- [type](src/type.js) - Script with common methods for all variable types
- [validate](src/validate.js) - Script with behaviours related to validation
- [vari](src/vari.js) - Script with a set of general functions related to variables

### Distributable
**QuidPHP/JavaScript** contains 2 scripts that can be used in the browser.
- [javascript.js](dist/javascript.js) - Minified and transpiled script ready for production
- [javascript-test.js](dist/javascript-test.js) - Same as javascript.js but also contains the module tests

### Testing
**QuidPHP/JavaScript** contains 2 test scripts:
- [javascript](test/javascript.js) - Script to test the module in node or the browser
- [run](test/run.js) - File to run the testsuite in node

**QuidPHP/JavaScript** testsuite can be run in the browser by creating a new [QuidPHP/Assert](https://github.com/quidphp/assert) project. It can also be run in Node with the command: 
``` bash
$ npm run test
```