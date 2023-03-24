import {type Claim, type Claims, type ClaimSnakString, type Entity, getImageUrl, getSitelinkData, getSitelinkUrl, type PropertyId, type Site, type Sitelinks, type Term} from 'wikibase-sdk';

export class WikibaseEntityReader {
	constructor(
		public readonly entity: Readonly<Entity>,
		private readonly defaultLanguageCode: string = 'en',
	) {}

	qNumber(): Entity['id'] {
		return this.entity.id;
	}

	label(languageCode = this.defaultLanguageCode): string {
		const labels = 'labels' in this.entity
			&& this.entity.labels as Record<string, Term>;
		if (!labels) {
			return this.entity.id;
		}

		return labels[languageCode]?.value
			?? labels[this.#baseLanguageCode(languageCode)]?.value
			?? this.entity.id;
	}

	description(languageCode = this.defaultLanguageCode): string | undefined {
		const descriptions = 'descriptions' in this.entity
			&& this.entity.descriptions as Record<string, Term>;
		if (!descriptions) {
			return undefined;
		}

		return descriptions[languageCode]?.value
			?? descriptions[this.#baseLanguageCode(languageCode)]?.value;
	}

	aliases(languageCode = this.defaultLanguageCode): readonly string[] {
		if (!('aliases' in this.entity)) {
			return [];
		}

		const aliases = this.entity.aliases as Record<string, Term[]>;
		return aliases?.[languageCode]?.map(o => o.value) ?? [];
	}

	url(): string {
		return `https://www.wikidata.org/wiki/${this.entity.id}`;
	}

	allSitelinks(): Site[] {
		if (!('sitelinks' in this.entity)) {
			return [];
		}

		return Object.keys(this.entity.sitelinks ?? {}) as Array<keyof Sitelinks>;
	}

	allSitelinksInLang(lang = this.defaultLanguageCode): Site[] {
		return this.allSitelinks()
			.filter(o => getSitelinkData(o).lang === lang);
	}

	sitelinkUrl(site: Site): string | undefined {
		if (!('sitelinks' in this.entity)) {
			return undefined;
		}

		const title = this.entity.sitelinks?.[site]?.title;
		if (!title) {
			return undefined;
		}

		return getSitelinkUrl({site, title});
	}

	allClaims(): PropertyId[] {
		if (!('claims' in this.entity)) {
			return [];
		}

		return Object.keys(this.entity.claims ?? {}) as Array<keyof Claims>;
	}

	claim(claim: PropertyId): readonly Claim[] {
		if (!('claims' in this.entity)) {
			return [];
		}

		return this.entity.claims?.[claim] ?? [];
	}

	images(width?: number): readonly string[] {
		const images = this.claim('P18')
			.map(o => o.mainsnak.datavalue)
			.filter((o): o is Readonly<ClaimSnakString> => o?.type === 'string')
			.map(o => getImageUrl(o.value, width))
			.map(o => encodeURI(o));
		return images;
	}

	unicodeChars(): readonly string[] {
		return this.claim('P487')
			.map(o => o.mainsnak.datavalue)
			.filter((o): o is Readonly<ClaimSnakString> => o?.type === 'string')
			.map(o => o.value);
	}

	#baseLanguageCode(languageCode: string) {
		return languageCode.split('-')[0]!;
	}
}
