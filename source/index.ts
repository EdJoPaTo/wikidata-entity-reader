import {
	type Claim,
	type Claims,
	type Entity,
	type EntityId,
	getImageUrl,
	getSitelinkData,
	getSitelinkUrl,
	type PropertyId,
	type Site,
	type Sitelinks,
	type SnakValue,
	type StringSnakValue,
	type Term,
	truthyPropertyClaims,
} from 'wikibase-sdk';

export class WikibaseEntityReader {
	constructor(
		public readonly entity: Readonly<Entity>,
		/** LanguageCode which is used as a fallback. Defaults to 'en'. */
		private readonly defaultLanguageCode = 'en',
	) {}

	/** Returns the id / Q-Number of the entity */
	qNumber(): EntityId {
		return this.entity.id;
	}

	/** Returns the label in the given languageCode (or the default one from the constructor) */
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

	/** Returns the description in the given languageCode (or the default one from the constructor) */
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
		const aliases = 'aliases' in this.entity
			&& this.entity.aliases as Record<string, Term[]>;
		if (!aliases) {
			return [];
		}

		return aliases[languageCode]?.map(o => o.value)
			?? aliases[this.#baseLanguageCode(languageCode)]?.map(o => o.value)
			?? [];
	}

	/** Returns the url of the entity a user would like to use */
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

	/** Returns all PropertyIds of claims the entity has */
	allClaims(): PropertyId[] {
		if (!('claims' in this.entity)) {
			return [];
		}

		return Object.keys(this.entity.claims ?? {}) as Array<keyof Claims>;
	}

	/** Returns the array of information for the requested claim */
	claim(claim: PropertyId): readonly Claim[] {
		if (!('claims' in this.entity)) {
			return [];
		}

		return this.entity.claims?.[claim] ?? [];
	}

	/** Return truthy claim values (first preferred, otherwise normal) */
	claimValues(claim: PropertyId): readonly SnakValue[] {
		const claims = this.claim(claim);
		const truthy = truthyPropertyClaims([...claims]);
		return truthy
			.map(o => o.mainsnak.datavalue)
			.filter((o): o is SnakValue => typeof o?.type === 'string');
	}

	/** Returns the full image urls of the entity. Optional with the requested width. */
	images(width?: number): readonly string[] {
		const images = this.claimValues('P18')
			.filter((o): o is Readonly<StringSnakValue> => o.type === 'string')
			.map(o => getImageUrl(o.value, width))
			.map(o => encodeURI(o));
		return images;
	}

	unicodeChars(): readonly string[] {
		return this.claimValues('P487')
			.filter((o): o is Readonly<StringSnakValue> => o.type === 'string')
			.map(o => o.value);
	}

	#baseLanguageCode(languageCode: string) {
		return languageCode.split('-')[0]!;
	}
}
