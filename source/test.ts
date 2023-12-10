import {deepStrictEqual, strictEqual} from 'node:assert';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import type {Entity} from 'wikibase-sdk';
import {WikibaseEntityReader} from './index.js';

const entityCat = JSON.parse(readFileSync('test/cat.json', 'utf8')) as Entity;
const entityHuman = JSON.parse(
	readFileSync('test/human.json', 'utf8'),
) as Entity;

const minimalEntity = {
	type: 'item',
	id: 'Q2',
} as const satisfies Entity;

await test('qNumber', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	strictEqual(reader.qNumber(), 'Q5');
});

await test('label with default lang en', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	strictEqual(reader.label(), 'human');
});

await test('label with lang by argument', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	strictEqual(reader.label('de'), 'Mensch');
});

await test('label with lang by constructor', () => {
	const reader = new WikibaseEntityReader(entityHuman, 'de');
	strictEqual(reader.label(), 'Mensch');
});

await test('label not existing', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	strictEqual(reader.label('undefined language'), 'Q5');
});

await test('label with country lang falls back base lang', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	strictEqual(reader.label('de-somewhere'), 'Mensch');
});

await test('label from item without labels', () => {
	const reader = new WikibaseEntityReader(minimalEntity);
	strictEqual(reader.label(), 'Q2');
});

await test('description with default lang en', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	strictEqual(
		reader.description(),
		'common name of Homo sapiens, unique extant species of the genus Homo, from embryo to adult',
	);
});

await test('description with lang by argument', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	strictEqual(
		reader.description('de'),
		'höheres Säugetier aus der Ordnung der Primaten',
	);
});

await test('description with lang by constructor', () => {
	const reader = new WikibaseEntityReader(entityHuman, 'de');
	strictEqual(
		reader.description(),
		'höheres Säugetier aus der Ordnung der Primaten',
	);
});

await test('description not existing', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	strictEqual(reader.description('undefined language'), undefined);
});

await test('description with country lang falls back base lang', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	strictEqual(
		reader.description('de-somewhere'),
		'höheres Säugetier aus der Ordnung der Primaten',
	);
});

await test('description from item without descriptions', () => {
	const reader = new WikibaseEntityReader(minimalEntity);
	strictEqual(reader.description(), undefined);
});

await test('aliases with default lang en', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	deepStrictEqual(reader.aliases(), [
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

await test('aliases with lang by argument', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	deepStrictEqual(reader.aliases('de'), [
		'Homo sapiens',
		'Person',
		'Homo sapiens sapiens',
		'Personen',
		'Menschen',
	]);
});

await test('aliases with lang by constructor', () => {
	const reader = new WikibaseEntityReader(entityHuman, 'de');
	deepStrictEqual(reader.aliases(), [
		'Homo sapiens',
		'Person',
		'Homo sapiens sapiens',
		'Personen',
		'Menschen',
	]);
});

await test('aliases not existing', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	deepStrictEqual(reader.aliases('undefined language'), []);
});

await test('aliases from item without aliases', () => {
	const reader = new WikibaseEntityReader(minimalEntity);
	deepStrictEqual(reader.aliases(), []);
});

await test('url', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	strictEqual(reader.url(), 'https://www.wikidata.org/wiki/Q5');
});

await test('allSitelinks', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	deepStrictEqual(reader.allSitelinks(), [
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

await test('allSitelinks on entity without sitelinks', () => {
	const reader = new WikibaseEntityReader(minimalEntity);
	deepStrictEqual(reader.allSitelinks(), []);
});

await test('allSitelinksinLang with default lang en', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	deepStrictEqual(reader.allSitelinksInLang(), ['enwiki', 'enwikiquote']);
});

await test('allSitelinksinLang with lang by argument', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	deepStrictEqual(reader.allSitelinksInLang('ru'), [
		'ruwiki',
		'ruwikinews',
		'ruwikiquote',
	]);
});

await test('allSitelinksinLang with lang by constructor', () => {
	const reader = new WikibaseEntityReader(entityHuman, 'ru');
	deepStrictEqual(reader.allSitelinksInLang(), [
		'ruwiki',
		'ruwikinews',
		'ruwikiquote',
	]);
});

await test('sitelinkUrl', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	strictEqual(
		reader.sitelinkUrl('dewiki'),
		'https://de.wikipedia.org/wiki/Mensch',
	);
});

await test('sitelinkUrl not existing', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	// @ts-expect-error undefined site
	strictEqual(reader.sitelinkUrl('undefined site'), undefined);
});

await test('sitelinkUrl from item without sitelinks', () => {
	const reader = new WikibaseEntityReader(minimalEntity);
	strictEqual(reader.sitelinkUrl('dewiki'), undefined);
});

await test('allClaims', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	deepStrictEqual(reader.allClaims(), [
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

await test('allClaims on entity without claims', () => {
	const reader = new WikibaseEntityReader(minimalEntity);
	deepStrictEqual(reader.allClaims(), []);
});

await test('claim', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	deepStrictEqual(reader.claim('P18').map(o => o.mainsnak.datavalue?.value), [
		'Anterior view of human female and male, with labels.svg',
	]);
});

await test('claim not existing', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	// @ts-expect-error not a PropertyId
	deepStrictEqual(reader.claim('unknown claim'), []);
});

await test('claim from item without claims', () => {
	const reader = new WikibaseEntityReader(minimalEntity);
	// @ts-expect-error not a PropertyId
	deepStrictEqual(reader.claim('unknown claim'), []);
});

await test('images', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	deepStrictEqual(reader.images(), [
		'https://commons.wikimedia.org/wiki/Special:FilePath/Anterior%20view%20of%20human%20female%20and%20male,%20with%20labels.svg',
	]);
});

await test('images with width', () => {
	const reader = new WikibaseEntityReader(entityHuman);
	deepStrictEqual(reader.images(42), [
		'https://commons.wikimedia.org/wiki/Special:FilePath/Anterior%20view%20of%20human%20female%20and%20male,%20with%20labels.svg?width=42',
	]);
});

await test('unicodeChars', () => {
	const reader = new WikibaseEntityReader(entityCat);
	deepStrictEqual(reader.unicodeChars(), ['🐈', '🐱']);
});
