'use strict';
var child = require('child_process');
var execa = require('execa');

module.exports = function (dir) {
	return execa('git', ['status', '--porcelain'], {
		cwd: dir || process.cwd(),
		preferLocal: false
	}).then(function (result) {
		return !(result.stdout && result.stdout.trim());
	});
};

module.exports.sync = function (dir) {
	var stdout = child.execFileSync('git', ['status', '--porcelain'], {
		cwd: dir || process.cwd(),
		encoding: 'utf8'
	});

	return !(stdout && stdout.trim());
};
