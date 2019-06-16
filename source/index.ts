import {getImageUrl, EntitySimplified} from 'wikidata-sdk';

export default class WikidataEntityReader {
	constructor(
		public entity: EntitySimplified,
		private defaultLanguageCode: string = 'en'
	) { }

	qNumber(): string {
		return this.entity.id;
	}

	label(languageCode = this.defaultLanguageCode): string {
		const {labels} = this.entity;
		if (!labels || !labels[languageCode]) {
			return this.entity.id;
		}

		return labels[languageCode];
	}

	description(languageCode = this.defaultLanguageCode): string | undefined {
		const {descriptions} = this.entity;
		if (!descriptions) {
			return undefined;
		}

		return descriptions[languageCode];
	}

	url(): string {
		return `https://www.wikidata.org/wiki/${this.entity.id}`;
	}

	claim(claim: string): readonly any[] {
		const {claims} = this.entity;
		if (!claims || !claims[claim]) {
			return [];
		}

		return claims[claim];
	}

	images(width?: number): readonly string[] {
		const images = this.claim('P18')
			.map(o => getImageUrl(o, width));
		return images;
	}

	unicodeChars(): readonly string[] {
		return this.claim('P487');
	}
}

// For CommonJS default export support
module.exports = WikidataEntityReader;
module.exports.default = WikidataEntityReader;
