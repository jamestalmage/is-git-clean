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
});
