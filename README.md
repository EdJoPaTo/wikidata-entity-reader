# wikidata-entity-reader

[![NPM Version](https://img.shields.io/npm/v/wikidata-entity-reader.svg)](https://www.npmjs.com/package/wikidata-entity-reader)
[![node](https://img.shields.io/node/v/wikidata-entity-reader.svg)](https://www.npmjs.com/package/wikidata-entity-reader)

> read information of wikidata entities in a simpler way

This library is meant to help with things like labels in a predefined language or faster access to claims

## Install

```bash
npm install wikidata-entity-reader
```

## Usage

```ts
import { WikibaseEntityReader } from 'wikidata-entity-reader';

const reader = new WikibaseEntityReader(entity, 'en');

reader.label();
//=> 'human'

reader.label('de');
//=> 'Mensch'
```
