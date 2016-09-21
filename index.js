'use strict';
var child = require('child_process');
var execa = require('execa');
var multimatch = require('multimatch');
var TEN_MEBIBYTE = 1024 * 1024 * 10;
var porcelainRegex = /([AMRDC]|\?\?)\s/g;

function filterIgnored(stdout, options) {
	var parsed = stdout.replace(porcelainRegex, '').trim().split('\n');

	if (options.files) {
		parsed = multimatch(parsed, ['*'].concat(options.files));
	}

	return parsed;
}

module.exports = function (dir, options) {
	return execa('git', ['status', '--porcelain'], {
		cwd: dir || process.cwd(),
		preferLocal: false
	}).then(function (result) {
		if (options) {
			return filterIgnored(result.stdout, options).length === 0;
		}

		return !(result.stdout && result.stdout.trim());
	});
};

module.exports.sync = function (dir, options) {
	var stdout = child.execFileSync('git', ['status', '--porcelain'], {
		cwd: dir || process.cwd(),
		encoding: 'utf8',
		maxBuffer: TEN_MEBIBYTE
	});

	if (options) {
		return filterIgnored(stdout, options).length === 0;
	}

	return !(stdout && stdout.trim());
};
