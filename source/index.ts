import {EntitySimplified} from './wikibase-sdk-types';

const {getImageUrl, getSitelinkUrl, getSitelinkData} = require('wikibase-sdk');

export default class WikidataEntityReader {
	constructor(
		public readonly entity: EntitySimplified,
		private readonly defaultLanguageCode: string = 'en',
	) {}

	qNumber(): string {
		return this.entity.id;
	}

	label(languageCode = this.defaultLanguageCode): string {
		const {labels} = this.entity;
		if (!labels) {
			return this.entity.id;
		}

		return (labels[languageCode]
			?? labels[this._baseLanguageCode(languageCode)])
			?? this.entity.id;
	}

	description(languageCode = this.defaultLanguageCode): string | undefined {
		const {descriptions} = this.entity;
		if (!descriptions) {
			return undefined;
		}

		return descriptions[languageCode]
			?? descriptions[this._baseLanguageCode(languageCode)];
	}

	aliases(languageCode = this.defaultLanguageCode): readonly string[] {
		return this.entity.aliases?.[languageCode] ?? [];
	}

	url(): string {
		return `https://www.wikidata.org/wiki/${this.entity.id}`;
	}

	allSitelinks(): readonly string[] {
		return Object.keys(this.entity.sitelinks ?? {});
	}

	allSitelinksInLang(lang = this.defaultLanguageCode): readonly string[] {
		return this.allSitelinks()
			.filter(o => getSitelinkData(o).lang === lang);
	}

	sitelinkUrl(sitekey: string): string | undefined {
		const sitelink = this.entity.sitelinks?.[sitekey];
		if (!sitelink) {
			return undefined;
		}

		return getSitelinkUrl(sitekey, sitelink);
	}

	allClaims(): readonly string[] {
		return Object.keys(this.entity.claims ?? {});
	}

	claim(claim: string): readonly any[] {
		return this.entity.claims?.[claim] ?? [];
	}

	images(width?: number): readonly string[] {
		const images = (this.claim('P18') as readonly string[])
			.map(o => getImageUrl(o, width))
			.map(o => encodeURI(o));
		return images;
	}

	unicodeChars(): readonly string[] {
		return this.claim('P487');
	}

	private _baseLanguageCode(languageCode: string): string {
		return languageCode.split('-')[0]!;
	}
}

// For CommonJS default export support
module.exports = WikidataEntityReader;
module.exports.default = WikidataEntityReader;
