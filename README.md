# Ionic with TypeScript, ES6, and Modules
This was an experiment to build Ionic with Visual Studio Code, TypeScript, BabelJS, and module support.

## Components



## Usage
TypeScript (`.ts`) and Javascript (`.js`) file should go in the `src` directory.

### Building
Additional gulp tasks are provided for building the project.

* `gulp compile`
This task will transpile the TypeScript and ES6 code into ES5.  For TypeScript, this is done by first targeting ES6 and then all of the code is then passed through `babeljs` and `ngAnnotate`.  The resulting ES5 files are place in the `build` directory.

* `gulp bundle`
This task will bundle all of the modules into a single bundle using system.js[1].  The resulting bundle file (`bundle.js`) will be placed in `www/js`.

1. https://github.com/systemjs/systemjs
