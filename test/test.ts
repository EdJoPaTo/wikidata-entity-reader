import {readFileSync} from 'node:fs';
import test from 'ava';
import type {Entity} from 'wikibase-sdk';
import {WikibaseEntityReader} from '../source/index.js';

const entityCat = JSON.parse(readFileSync('test/cat.json', 'utf8')) as Entity;
const entityHuman = JSON.parse(readFileSync('test/human.json', 'utf8')) as Entity;

const minimalEntity = {
	type: 'item',
	id: 'Q2',
} as const satisfies Entity;

test('qNumber', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.is(reader.qNumber(), 'Q5');
});

test('label with default lang en', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.is(reader.label(), 'human');
});

test('label with lang by argument', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.is(reader.label('de'), 'Mensch');
});

test('label with lang by constructor', t => {
	const reader = new WikibaseEntityReader(entityHuman, 'de');
	t.is(reader.label(), 'Mensch');
});

test('label not existing', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.is(reader.label('undefined language'), 'Q5');
});

test('label with country lang falls back base lang', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.is(reader.label('de-somewhere'), 'Mensch');
});

test('label from item without labels', t => {
	const reader = new WikibaseEntityReader(minimalEntity);
	t.is(reader.label(), 'Q2');
});

test('description with default lang en', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.is(
		reader.description(),
		'common name of Homo sapiens, unique extant species of the genus Homo, from embryo to adult',
	);
});

test('description with lang by argument', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.is(
		reader.description('de'),
		'höheres Säugetier aus der Ordnung der Primaten',
	);
});

test('description with lang by constructor', t => {
	const reader = new WikibaseEntityReader(entityHuman, 'de');
	t.is(
		reader.description(),
		'höheres Säugetier aus der Ordnung der Primaten',
	);
});

test('description not existing', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.is(reader.description('undefined language'), undefined);
});

test('description with country lang falls back base lang', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.is(
		reader.description('de-somewhere'),
		'höheres Säugetier aus der Ordnung der Primaten',
	);
});

test('description from item without descriptions', t => {
	const reader = new WikibaseEntityReader(minimalEntity);
	t.is(reader.description(), undefined);
});

test('aliases with default lang en', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.deepEqual(reader.aliases(), [
		'human being',
		'humankind',
		'people',
		'mankind',
		'peoplekind',
		'humans',
		'man',
		'men',
		'person',
	]);
});

test('aliases with lang by argument', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.deepEqual(reader.aliases('de'), [
		'Homo sapiens',
		'Person',
		'Homo sapiens sapiens',
		'Personen',
		'Menschen',
	]);
});

test('aliases with lang by constructor', t => {
	const reader = new WikibaseEntityReader(entityHuman, 'de');
	t.deepEqual(reader.aliases(), [
		'Homo sapiens',
		'Person',
		'Homo sapiens sapiens',
		'Personen',
		'Menschen',
	]);
});

test('aliases not existing', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.deepEqual(reader.aliases('undefined language'), []);
});

test('aliases from item without aliases', t => {
	const reader = new WikibaseEntityReader(minimalEntity);
	t.deepEqual(reader.aliases(), []);
});

test('url', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.is(reader.url(), 'https://www.wikidata.org/wiki/Q5');
});

test('allSitelinks', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.deepEqual(reader.allSitelinks(), [
		'acewiki',
		'afwiki',
		'alswiki',
		'amwiki',
		'anpwiki',
		'anwiki',
		'arcwiki',
		'arwiki',
		'arwikiquote',
		'arywiki',
		'arzwiki',
		'astwiki',
		'aswiki',
		'atjwiki',
		'avwiki',
		'awawiki',
		'aywiki',
		'azbwiki',
		'azwiki',
		'azwikiquote',
		'banwiki',
		'barwiki',
		'bat_smgwiki',
		'bawiki',
		'bclwiki',
		'be_x_oldwiki',
		'bewiki',
		'bewikisource',
		'bgwiki',
		'bhwiki',
		'bjnwiki',
		'bnwiki',
		'bowiki',
		'brwiki',
		'bswiki',
		'bswikiquote',
		'bxrwiki',
		'cawiki',
		'cdowiki',
		'cebwiki',
		'cewiki',
		'ckbwiki',
		'cowiki',
		'cswiki',
		'cswikiquote',
		'cvwiki',
		'cywiki',
		'dagwiki',
		'dawiki',
		'dewiki',
		'dewikinews',
		'dewikiquote',
		'diqwiki',
		'dtywiki',
		'elwiki',
		'elwikiquote',
		'enwiki',
		'enwikiquote',
		'eowiki',
		'eowikinews',
		'eowikiquote',
		'eswiki',
		'eswikinews',
		'eswikiquote',
		'etwiki',
		'etwikiquote',
		'euwiki',
		'fawiki',
		'fawikiquote',
		'fiu_vrowiki',
		'fiwiki',
		'fiwikiquote',
		'fowiki',
		'frrwiki',
		'frwiki',
		'furwiki',
		'fywiki',
		'ganwiki',
		'gawiki',
		'gcrwiki',
		'gdwiki',
		'glkwiki',
		'glwiki',
		'glwikiquote',
		'gnwiki',
		'guwiki',
		'hakwiki',
		'hawiki',
		'hewiki',
		'hewikiquote',
		'hifwiki',
		'hiwiki',
		'hrwiki',
		'hrwikiquote',
		'htwiki',
		'huwiki',
		'huwikiquote',
		'hywiki',
		'hywikiquote',
		'idwiki',
		'igwiki',
		'ilowiki',
		'inhwiki',
		'iowiki',
		'iswiki',
		'itwikinews',
		'itwikiquote',
		'iuwiki',
		'jamwiki',
		'jawiki',
		'jbowiki',
		'jvwiki',
		'kaawiki',
		'kabwiki',
		'kawiki',
		'kgwiki',
		'kkwiki',
		'kmwiki',
		'knwiki',
		'koiwiki',
		'kowiki',
		'kowikiquote',
		'kshwiki',
		'kswiki',
		'kuwiki',
		'kvwiki',
		'kwwiki',
		'kywiki',
		'lawiki',
		'lawikiquote',
		'lbewiki',
		'lezwiki',
		'lfnwiki',
		'lgwiki',
		'lijwiki',
		'liwiki',
		'lldwiki',
		'lnwiki',
		'lowiki',
		'ltgwiki',
		'ltwiki',
		'ltwikiquote',
		'lvwiki',
		'maiwiki',
		'map_bmswiki',
		'mdfwiki',
		'mgwiki',
		'mhrwiki',
		'minwiki',
		'mkwiki',
		'mlwiki',
		'mniwiki',
		'mnwiki',
		'mrwiki',
		'mswiki',
		'mtwiki',
		'mwlwiki',
		'myvwiki',
		'mywiki',
		'mznwiki',
		'nahwiki',
		'nds_nlwiki',
		'newiki',
		'newwiki',
		'nlwiki',
		'nlwikiquote',
		'nnwiki',
		'nnwikiquote',
		'nowiki',
		'ocwiki',
		'orwiki',
		'oswiki',
		'pamwiki',
		'papwiki',
		'pawiki',
		'pihwiki',
		'piwiki',
		'plwiki',
		'plwikiquote',
		'pmswiki',
		'pnbwiki',
		'pswiki',
		'ptwiki',
		'ptwikinews',
		'quwiki',
		'rmwiki',
		'rmywiki',
		'roa_rupwiki',
		'rowiki',
		'ruwiki',
		'ruwikinews',
		'ruwikiquote',
		'sahwiki',
		'satwiki',
		'sawiki',
		'scnwiki',
		'scowiki',
		'sdwiki',
		'sewiki',
		'shiwiki',
		'shwiki',
		'simplewiki',
		'siwiki',
		'skwiki',
		'skwikiquote',
		'slwiki',
		'slwikiquote',
		'snwiki',
		'sowiki',
		'sqwiki',
		'srwiki',
		'srwikiquote',
		'suwiki',
		'svwiki',
		'swwiki',
		'szlwiki',
		'szywiki',
		'tawiki',
		'tawikiquote',
		'taywiki',
		'tewiki',
		'tgwiki',
		'thwiki',
		'tkwiki',
		'tlwiki',
		'trwiki',
		'trwikiquote',
		'tswiki',
		'ttwiki',
		'tumwiki',
		'twwiki',
		'ugwiki',
		'ukwiki',
		'ukwikiquote',
		'urwiki',
		'uzwiki',
		'vepwiki',
		'viwiki',
		'viwikiquote',
		'vlswiki',
		'warwiki',
		'wawiki',
		'wuuwiki',
		'xhwiki',
		'xmfwiki',
		'yiwiki',
		'yowiki',
		'zawiki',
		'zh_classicalwiki',
		'zh_min_nanwiki',
		'zh_yuewiki',
		'zhwiki',
		'zhwikiquote',
		'zuwiki',
	]);
});

test('allSitelinks on entity without sitelinks', t => {
	const reader = new WikibaseEntityReader(minimalEntity);
	t.deepEqual(reader.allSitelinks(), []);
});

test('allSitelinksinLang with default lang en', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.deepEqual(reader.allSitelinksInLang(), ['enwiki', 'enwikiquote']);
});

test('allSitelinksinLang with lang by argument', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.deepEqual(reader.allSitelinksInLang('ru'), [
		'ruwiki',
		'ruwikinews',
		'ruwikiquote',
	]);
});

test('allSitelinksinLang with lang by constructor', t => {
	const reader = new WikibaseEntityReader(entityHuman, 'ru');
	t.deepEqual(reader.allSitelinksInLang(), [
		'ruwiki',
		'ruwikinews',
		'ruwikiquote',
	]);
});

test('sitelinkUrl', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.is(reader.sitelinkUrl('dewiki'), 'https://de.wikipedia.org/wiki/Mensch');
});

test('sitelinkUrl not existing', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	// @ts-expect-error undefined site
	t.is(reader.sitelinkUrl('undefined site'), undefined);
});

test('sitelinkUrl from item without sitelinks', t => {
	const reader = new WikibaseEntityReader(minimalEntity);
	t.is(reader.sitelinkUrl('dewiki'), undefined);
});

test('allClaims', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.deepEqual(reader.allClaims(), [
		'P527',
		'P1552',
		'P361',
		'P1424',
		'P1245',
		'P910',
		'P646',
		'P1343',
		'P1963',
		'P227',
		'P1417',
		'P2959',
		'P3222',
		'P3417',
		'P949',
		'P3827',
		'P373',
		'P2579',
		'P1051',
		'P2283',
		'P460',
		'P1225',
		'P2888',
		'P2581',
		'P4733',
		'P4613',
		'P5008',
		'P2521',
		'P3321',
		'P5198',
		'P1889',
		'P5869',
		'P279',
		'P3241',
		'P5247',
		'P5555',
		'P6385',
		'P6573',
		'P31',
		'P6900',
		'P1296',
		'P7033',
		'P7007',
		'P486',
		'P672',
		'P7497',
		'P7703',
		'P7314',
		'P3916',
		'P8408',
		'P1542',
		'P443',
		'P18',
		'P1256',
		'P3553',
		'P6839',
		'P1709',
		'P8512',
		'P7807',
		'P2892',
		'P1748',
		'P5806',
		'P268',
		'P7329',
		'P8785',
		'P8885',
		'P8895',
		'P8168',
		'P129',
		'P1036',
		'P4212',
		'P6512',
		'P1344',
		'P842',
		'P9084',
		'P10283',
		'P8419',
		'P4527',
		'P8313',
		'P8972',
		'P8814',
		'P691',
		'P10757',
		'P2184',
		'P10565',
		'P5034',
		'P2163',
		'P6262',
		'P1114',
		'P5337',
		'P8189',
		'P9495',
		'P10376',
	]);
});

test('allClaims on entity without claims', t => {
	const reader = new WikibaseEntityReader(minimalEntity);
	t.deepEqual(reader.allClaims(), []);
});

test('claim', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.deepEqual(reader.claim('P18').map(o => o.mainsnak.datavalue?.value), [
		'Anterior view of human female and male, with labels.svg',
	]);
});

test('claim not existing', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	// @ts-expect-error not a PropertyId
	t.deepEqual(reader.claim('unknown claim'), []);
});

test('claim from item without claims', t => {
	const reader = new WikibaseEntityReader(minimalEntity);
	// @ts-expect-error not a PropertyId
	t.deepEqual(reader.claim('unknown claim'), []);
});

test('images', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.deepEqual(reader.images(), [
		'https://commons.wikimedia.org/wiki/Special:FilePath/Anterior%20view%20of%20human%20female%20and%20male,%20with%20labels.svg',
	]);
});

test('images with width', t => {
	const reader = new WikibaseEntityReader(entityHuman);
	t.deepEqual(reader.images(42), [
		'https://commons.wikimedia.org/wiki/Special:FilePath/Anterior%20view%20of%20human%20female%20and%20male,%20with%20labels.svg?width=42',
	]);
});

test('unicodeChars', t => {
	const reader = new WikibaseEntityReader(entityCat);
	t.deepEqual(reader.unicodeChars(), ['🐈', '🐱']);
});
