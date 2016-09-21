# is-git-clean [![Build Status](https://travis-ci.org/jamestalmage/is-git-clean.svg?branch=master)](https://travis-ci.org/jamestalmage/is-git-clean)

> Find out if a git directory is clean or not


## Install

```
$ npm install --save is-git-clean
```


## Usage

```js
const isGitClean = require('is-git-clean');

isGitClean().then(clean => console.log(clean));
//=> true || false

// alternate directory
isGitClean('/some/path')

// options
// `ignore.txt` is ignored and not counted as dirty
isGitClean('/some/path', {files: ['!ignore.txt']})

// sync version
isGitClean.sync()
```


## API

### isGitClean([dir], [options])

Returns a promise for a `boolean` value. `true` if the directory is clean, `false` if it is not.

#### dir

Type: `string` <br>
Default: `process.cwd()`

Path to the directory you want to check.

#### options

Type: `object`

##### files

Type: `array`

An array of [`multimatch`](https://github.com/sindresorhus/multimatch) patterns to ignore certain files.

### isGitClean.sync([dir], [options])

Synchronous version, with the same API as above. Returns a boolean directly, instead of a Promise.

## License

MIT © [James Talmage](http://github.com/jamestalmage)
