import {getImageUrl, getSitelinkUrl, getSitelinkData, type Site, type PropertyId} from 'wikibase-sdk';
import type {EntitySimplified} from './wikibase-sdk-types.js';

export class WikibaseEntityReader {
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
			?? labels[this.#baseLanguageCode(languageCode)])
			?? this.entity.id;
	}

	description(languageCode = this.defaultLanguageCode): string | undefined {
		const {descriptions} = this.entity;
		if (!descriptions) {
			return undefined;
		}

		return descriptions[languageCode]
			?? descriptions[this.#baseLanguageCode(languageCode)];
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

	sitelinkUrl(site: Site): string | undefined {
		const title = this.entity.sitelinks?.[site];
		if (!title) {
			return undefined;
		}

		return getSitelinkUrl({site, title});
	}

	allClaims(): readonly string[] {
		return Object.keys(this.entity.claims ?? {});
	}

	claim(claim: PropertyId): readonly unknown[] {
		return this.entity.claims?.[claim] ?? [];
	}

	images(width?: number): readonly string[] {
		const images = (this.claim('P18') as readonly string[])
			.map(o => getImageUrl(o, width))
			.map(o => encodeURI(o));
		return images;
	}

	unicodeChars(): readonly string[] {
		return this.claim('P487') as readonly string[];
	}

	#baseLanguageCode(languageCode: string) {
		return languageCode.split('-')[0]!;
	}
}
