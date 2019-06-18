import {getImageUrl, getSitelinkUrl, getSitelinkData, EntitySimplified} from 'wikidata-sdk';

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

	aliases(languageCode = this.defaultLanguageCode): readonly string[] {
		const {aliases} = this.entity;
		if (!aliases || !aliases[languageCode]) {
			return [];
		}

		return aliases[languageCode];
	}

	url(): string {
		return `https://www.wikidata.org/wiki/${this.entity.id}`;
	}

	allSitelinks(): readonly string[] {
		return Object.keys(this.entity.sitelinks || {});
	}

	allSitelinksInLang(lang = this.defaultLanguageCode): readonly string[] {
		return this.allSitelinks()
			.filter(o => getSitelinkData(o).lang === lang);
	}

	sitelinkUrl(sitekey: string): string | undefined {
		const {sitelinks} = this.entity;
		if (!sitelinks || !sitelinks[sitekey]) {
			return undefined;
		}

		return getSitelinkUrl(sitekey, sitelinks[sitekey]);
	}

	allClaims(): readonly string[] {
		return Object.keys(this.entity.claims || {});
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
