# wikidata-entity-reader

[![NPM Version](https://img.shields.io/npm/v/wikidata-entity-reader.svg)](https://www.npmjs.com/package/wikidata-entity-reader)
[![node](https://img.shields.io/node/v/wikidata-entity-reader.svg)](https://www.npmjs.com/package/wikidata-entity-reader)
[![Build Status](https://travis-ci.com/EdJoPaTo/wikidata-entity-reader.svg?branch=master)](https://travis-ci.com/EdJoPaTo/wikidata-entity-reader)
[![Dependency Status](https://david-dm.org/EdJoPaTo/wikidata-entity-reader/status.svg)](https://david-dm.org/EdJoPaTo/wikidata-entity-reader)
[![Dev Dependency Status](https://david-dm.org/EdJoPaTo/wikidata-entity-reader/dev-status.svg)](https://david-dm.org/EdJoPaTo/wikidata-entity-reader?type=dev)

> read information of wikidata entities in a simpler way

This library is meant to help with things like labels in a predefined language or faster access to claims


## Install

```
$ npm install wikidata-entity-reader
```


## Usage

```js
const WikidataEntityReader = require('wikidata-entity-reader');

const reader = new WikidataEntityReader(entity, 'en');

reader.label();
//=> 'human'

reader.label('de');
//=> 'Mensch'
```


## API

### new WikidataEntityReader

```js
const reader = new WikidataEntityReader(entity);
const reader = new WikidataEntityReader(entity, defaultLanguageCode);
const reader = new WikidataEntityReader(entity, 'de');
```

#### entity

Type: `EntitySimplified`

simplified entity from [wikibase-sdk](https://github.com/maxlath/wikibase-sdk).

#### defaultLanguageCode

Type: `string`

languageCode which is used as a fallback.
Defaults to 'en'.


### reader.qNumber

Returns the id / Q-Number of the entity.

```js
const qNumber = reader.qNumber();
```


### reader.label

Returns the label in the given languageCode (or the default one from the constructor).

```js
const label = reader.label();
const label = reader.label(languageCode);
const label = reader.label('de');
```


### reader.description

Returns the description in the given languageCode (or the default one from the constructor).

```js
const label = reader.description();
const label = reader.description(languageCode);
const label = reader.description('de');
```


### reader.url

Returns the url of the entity a user would like to use.

```js
const url = reader.url();
```


### reader.claim

Returns the array of information for the requested claim.

```js
const information = reader.claim(property);
const information = reader.claim('P18');
```


### reader.images

Returns the full image urls of the entity. Optional with the requested width.

```js
const imageArray = reader.images();
const imageArray = reader.images(width);
const imageArray = reader.images(500);
```
