import path from 'path';
import {serial as test} from 'ava';
import fn from './';

const clean = path.join(__dirname, 'fixtures', 'clean');
const notClean = path.join(__dirname, 'fixtures', 'not-clean');

test('with path argument', async t => {
	t.true(await fn(clean));
	t.false(await fn(notClean));
	t.true(fn.sync(clean));
	t.false(fn.sync(notClean));
	t.false(await fn(notClean, {files: ['!dirty.txt']}));
	t.true(await fn(notClean, {files: ['!dirty.txt', '!dirtier.txt']}));
	t.true(await fn.sync(notClean, {files: ['!dirty.txt', '!dirtier.txt']}));
});

test('inside clean dir', async t => {
	process.chdir(clean);
	t.true(await fn());
	t.true(fn.sync());
});

test('inside notClean dir', async t => {
	process.chdir(notClean);
	t.false(await fn());
	t.false(fn.sync());
	t.false(await fn({files: ['!dirty.txt']}));
	t.true(await fn({files: ['!dirty.txt', '!dirtier.txt']}));
	t.true(await fn.sync({files: ['!dirty.txt', '!dirtier.txt']}));
});
