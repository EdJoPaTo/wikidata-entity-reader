import {readFileSync} from 'fs';

import {EntitySimplified} from 'wikidata-sdk';
import test from 'ava';

import WikidataEntityReader from '../source';

const entityCat = JSON.parse(readFileSync('test/cat.json', 'utf8'));
const entityHuman = JSON.parse(readFileSync('test/human.json', 'utf8'));

const minimalEntity: EntitySimplified = {
	type: 'item',
	id: 'Q2'
};

test('qNumber', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.qNumber(), 'Q5');
});

test('label with default lang en', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.label(), 'human');
});

test('label with lang by argument', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.label('de'), 'Mensch');
});

test('label with lang by constructor', t => {
	const reader = new WikidataEntityReader(entityHuman, 'de');
	t.is(reader.label(), 'Mensch');
});

test('label not existing', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.label('undefined language'), 'Q5');
});

test('label from item without labels', t => {
	const reader = new WikidataEntityReader(minimalEntity);
	t.is(reader.label(), 'Q2');
});

test('description with default lang en', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.description(), 'common name of Homo sapiens, unique extant species of the genus Homo');
});

test('description with lang by argument', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.description('de'), 'höheres Säugetier aus der Ordnung der Primaten, Trivialname von Homo sapiens und Homo sapiens sapiens');
});

test('description with lang by constructor', t => {
	const reader = new WikidataEntityReader(entityHuman, 'de');
	t.is(reader.description(), 'höheres Säugetier aus der Ordnung der Primaten, Trivialname von Homo sapiens und Homo sapiens sapiens');
});

test('description not existing', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.description('undefined language'), undefined);
});

test('description from item without descriptions', t => {
	const reader = new WikidataEntityReader(minimalEntity);
	t.is(reader.description(), undefined);
});

test('url', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.url(), 'https://www.wikidata.org/wiki/Q5');
});

test('claim', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.claim('P18'), [
		'Human.svg',
		'Anterior view of human female and male, with labels.svg'
	]);
});

test('claim not existing', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.claim('unknown claim'), []);
});

test('claim from item without claims', t => {
	const reader = new WikidataEntityReader(minimalEntity);
	t.deepEqual(reader.claim('unknown claim'), []);
});

test('images', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.images(), [
		'https://commons.wikimedia.org/wiki/Special:FilePath/Human.svg',
		'https://commons.wikimedia.org/wiki/Special:FilePath/Anterior view of human female and male, with labels.svg'
	]);
});

test('images with width', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.images(42), [
		'https://commons.wikimedia.org/wiki/Special:FilePath/Human.svg?width=42',
		'https://commons.wikimedia.org/wiki/Special:FilePath/Anterior view of human female and male, with labels.svg?width=42'
	]);
});

test('unicodeChars', t => {
	const reader = new WikidataEntityReader(entityCat);
	t.deepEqual(reader.unicodeChars(), ['🐈', '🐱']);
});
