'use strict';
var child = require('child_process');
var execa = require('execa');
var TEN_MEBIBYTE = 1024 * 1024 * 10;
var porcelainRegex = /([AMRDC]|\?\?)\s/g;

function filterIgnored(stdout, ignored) {
	var parsed = stdout.replace(porcelainRegex, '').trim().split('\n');

	return parsed.filter(function (file) {
		return ignored.indexOf(file) === -1;
	});
}

module.exports = function (dir, ignored) {
	return execa('git', ['status', '--porcelain'], {
		cwd: dir || process.cwd(),
		preferLocal: false
	}).then(function (result) {
		if (ignored) {
			return filterIgnored(result.stdout, ignored).length === 0;
		}

		return !(result.stdout && result.stdout.trim());
	});
};

module.exports.sync = function (dir, ignored) {
	var stdout = child.execFileSync('git', ['status', '--porcelain'], {
		cwd: dir || process.cwd(),
		encoding: 'utf8',
		maxBuffer: TEN_MEBIBYTE
	});

	if (ignored) {
		return filterIgnored(stdout, ignored).length === 0;
	}

	return !(stdout && stdout.trim());
};
