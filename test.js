import path from 'path';
import test from 'ava';
import fn from './';

const clean = path.join(__dirname, 'fixtures', 'clean');
const notClean = path.join(__dirname, 'fixtures', 'not-clean');

test(async t => {
	t.true(await fn(clean));
	t.false(await fn(notClean));
	t.true(fn.sync(clean));
	t.false(fn.sync(notClean));
	t.false(await fn(notClean, {files: ['!dirty.txt']}));
	t.true(await fn(notClean, {files: ['!dirty.txt', '!dirtier.txt']}));
	t.true(await fn.sync(notClean, {files: ['!dirty.txt', '!dirtier.txt']}));
});
