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

test('label with country lang falls back base lang', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.label('de-somewhere'), 'Mensch');
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

test('description with country lang falls back base lang', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.description('de-somewhere'), 'höheres Säugetier aus der Ordnung der Primaten, Trivialname von Homo sapiens und Homo sapiens sapiens');
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

test('allSitelinks', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.allSitelinks(), [
		'acewiki', 'afwiki', 'alswiki', 'amwiki', 'anwiki', 'arcwiki', 'arwiki', 'arwikiquote', 'arzwiki', 'astwiki', 'aswiki', 'avwiki', 'aywiki', 'azbwiki', 'azwiki', 'azwikiquote', 'barwiki', 'bat_smgwiki', 'bawiki', 'bclwiki', 'be_x_oldwiki', 'bewiki', 'bgwiki', 'bhwiki', 'bnwiki', 'bowiki', 'brwiki', 'bswiki', 'bswikiquote', 'bxrwiki', 'cawiki', 'cdowiki', 'cebwiki', 'cewiki', 'ckbwiki', 'cswiki', 'cswikiquote', 'cvwiki', 'cywiki', 'dawiki', 'dewiki', 'dewikiquote', 'diqwiki', 'dtywiki', 'elwiki', 'elwikiquote', 'enwiki', 'eowiki', 'eowikiquote', 'eswiki', 'eswikiquote', 'etwiki', 'etwikiquote', 'euwiki', 'fawiki', 'fawikiquote', 'fiu_vrowiki', 'fiwiki', 'fiwikiquote', 'fowiki', 'frrwiki', 'furwiki', 'fywiki', 'ganwiki', 'gawiki', 'glkwiki', 'glwiki', 'glwikiquote', 'gnwiki', 'guwiki', 'hakwiki', 'hawiki', 'hewiki', 'hewikiquote', 'hifwiki', 'hiwiki', 'hrwiki', 'hrwikiquote', 'htwiki', 'huwiki', 'huwikiquote', 'hywiki', 'hywikiquote', 'iawiki', 'idwiki', 'igwiki', 'ilowiki', 'inhwiki', 'iowiki', 'iswiki', 'itwikiquote', 'iuwiki', 'jamwiki', 'jawiki', 'jbowiki', 'jvwiki', 'kawiki', 'kgwiki', 'kkwiki', 'kmwiki', 'knwiki', 'koiwiki', 'kowiki', 'kowikiquote', 'kshwiki', 'kswiki', 'kuwiki', 'kvwiki', 'kwwiki', 'kywiki', 'lawiki', 'lawikiquote', 'lbewiki', 'lezwiki', 'lfnwiki', 'lgwiki', 'lijwiki', 'liwiki', 'lnwiki', 'lowiki', 'ltgwiki', 'ltwiki', 'ltwikiquote', 'lvwiki', 'maiwiki', 'map_bmswiki', 'mdfwiki', 'mgwiki', 'mhrwiki', 'minwiki', 'mkwiki', 'mlwiki', 'mnwiki', 'mrwiki', 'mswiki', 'mtwiki', 'mwlwiki', 'mywiki', 'nahwiki', 'nds_nlwiki', 'newiki', 'newwiki', 'nlwiki', 'nlwikiquote', 'nnwiki', 'nnwikiquote', 'nowiki', 'ocwiki', 'orwiki', 'oswiki', 'pamwiki', 'pawiki', 'piwiki', 'plwiki', 'plwikiquote', 'pmswiki', 'pnbwiki', 'pswiki', 'ptwiki', 'quwiki', 'rmywiki', 'roa_rupwiki', 'rowiki', 'ruwiki', 'ruwikinews', 'ruwikiquote', 'sahwiki', 'satwiki', 'sawiki', 'scnwiki', 'scowiki', 'sdwiki', 'sewiki', 'shwiki', 'simplewiki', 'siwiki', 'skwiki', 'skwikiquote', 'slwiki', 'slwikiquote', 'sowiki', 'sqwiki', 'srwiki', 'srwikiquote', 'suwiki', 'svwiki', 'swwiki', 'szlwiki', 'tawiki', 'tewiki', 'tgwiki', 'thwiki', 'tlwiki', 'trwiki', 'trwikiquote', 'tswiki', 'ttwiki', 'ugwiki', 'ukwiki', 'ukwikiquote', 'urwiki', 'uzwiki', 'vepwiki', 'viwiki', 'viwikiquote', 'vlswiki', 'warwiki', 'wawiki', 'wuuwiki', 'xhwiki', 'xmfwiki', 'yiwiki', 'yowiki', 'zawiki', 'zh_classicalwiki', 'zh_min_nanwiki', 'zh_yuewiki', 'zhwiki', 'zhwikiquote', 'zuwiki'
	]);
});

test('allSitelinks on entity without sitelinks', t => {
	const reader = new WikidataEntityReader(minimalEntity);
	t.deepEqual(reader.allSitelinks(), []);
});

test('allSitelinksinLang with default lang en', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.allSitelinksInLang(), ['enwiki']);
});

test('allSitelinksinLang with lang by argument', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.allSitelinksInLang('ru'), ['ruwiki', 'ruwikinews', 'ruwikiquote']);
});

test('allSitelinksinLang with lang by constructor', t => {
	const reader = new WikidataEntityReader(entityHuman, 'ru');
	t.deepEqual(reader.allSitelinksInLang(), ['ruwiki', 'ruwikinews', 'ruwikiquote']);
});

test('sitelinkUrl', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.sitelinkUrl('dewiki'), 'https://de.wikipedia.org/wiki/Mensch');
});

test('sitelinkUrl not existing', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.is(reader.sitelinkUrl('undefined sitekey'), undefined);
});

test('sitelinkUrl from item without sitelinks', t => {
	const reader = new WikidataEntityReader(minimalEntity);
	t.is(reader.sitelinkUrl('dewiki'), undefined);
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
		'https://commons.wikimedia.org/wiki/Special:FilePath/Anterior%20view%20of%20human%20female%20and%20male,%20with%20labels.svg'
	]);
});

test('images with width', t => {
	const reader = new WikidataEntityReader(entityHuman);
	t.deepEqual(reader.images(42), [
		'https://commons.wikimedia.org/wiki/Special:FilePath/Human.svg?width=42',
		'https://commons.wikimedia.org/wiki/Special:FilePath/Anterior%20view%20of%20human%20female%20and%20male,%20with%20labels.svg?width=42'
	]);
});

test('unicodeChars', t => {
	const reader = new WikidataEntityReader(entityCat);
	t.deepEqual(reader.unicodeChars(), ['🐈', '🐱']);
});
