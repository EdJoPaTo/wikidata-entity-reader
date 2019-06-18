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

test('aliases with default lang en', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.aliases(), ['human being', 'humankind', 'people', 'homosapiens', 'person']);
});

test('aliases with lang by argument', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.aliases('de'), ['Homo sapiens', 'Person', 'Homo sapiens sapiens']);
});

test('aliases with lang by constructor', t => {
	const reader = new WikidataEntityReader(entityHuman, 'de');
	t.deepEqual(reader.aliases(), ['Homo sapiens', 'Person', 'Homo sapiens sapiens']);
});

test('aliases not existing', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.aliases('undefined language'), []);
});

test('aliases from item without aliases', t => {
	const reader = new WikidataEntityReader(minimalEntity);
	t.deepEqual(reader.aliases(), []);
});

test('url', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.url(), 'https://www.wikidata.org/wiki/Q5');
});

test('allClaims', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.allClaims(), [
		'P527', 'P1552', 'P361', 'P1424', 'P1245', 'P910', 'P646', 'P1343', 'P1709', 'P1963', 'P227', 'P1417', 'P2959', 'P3222', 'P3417', 'P949', 'P1542', 'P3827', 'P373', 'P2579', 'P1056', 'P1051', 'P2283', 'P460', 'P1225', 'P2888', 'P2581', 'P4733', 'P4613', 'P5008', 'P2521', 'P3321', 'P5198', 'P1889', 'P5869', 'P2670', 'P279', 'P18', 'P3241', 'P1687', 'P5247', 'P6332', 'P5555', 'P6385', 'P6573', 'P443', 'P31'
	]);
});

test('allClaims on entity without claims', t => {
	const reader = new WikidataEntityReader(minimalEntity);
	t.deepEqual(reader.allClaims(), []);
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
