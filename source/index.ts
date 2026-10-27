import {
	type Claim,
	type Entity,
	type EntityId,
	getImageUrl,
	getSitelinkData,
	getSitelinkUrl,
	type PropertyId,
	type Site,
	type SnakDataValue,
	truthyPropertyClaims,
} from "wikibase-sdk";

export class WikibaseEntityReader {
	public readonly entity: Readonly<Entity>;

	private readonly defaultLanguageCode: string;

	constructor(
		// oxlint-disable-next-line typescript/prefer-readonly-parameter-types
		entity: Readonly<Entity>,
		/** LanguageCode which is used as a fallback. Defaults to 'en'. */
		defaultLanguageCode = "en",
	) {
		this.entity = entity;
		this.defaultLanguageCode = defaultLanguageCode;
	}

	/** Returns the id / Q-Number of the entity */
	qNumber(): EntityId {
		return this.entity.id;
	}

	/** Returns the label in the given languageCode (or the default one from the constructor) */
	label(languageCode = this.defaultLanguageCode): string {
		const labels = "labels" in this.entity && this.entity.labels;
		// oxlint-disable-next-line typescript/strict-boolean-expressions
		if (!labels) {
			return this.entity.id;
		}

		return (
			labels[languageCode]?.value ??
			labels[this.#baseLanguageCode(languageCode)]?.value ??
			this.entity.id
		);
	}

	/** Returns the description in the given languageCode (or the default one from the constructor) */
	description(languageCode = this.defaultLanguageCode): string | undefined {
		const descriptions = "descriptions" in this.entity && this.entity.descriptions;
		// oxlint-disable-next-line typescript/strict-boolean-expressions
		if (!descriptions) {
			return undefined;
		}

		return (
			descriptions[languageCode]?.value ?? descriptions[this.#baseLanguageCode(languageCode)]?.value
		);
	}

	aliases(languageCode = this.defaultLanguageCode): readonly string[] {
		const aliases = "aliases" in this.entity && this.entity.aliases;
		// oxlint-disable-next-line typescript/strict-boolean-expressions
		if (!aliases) {
			return [];
		}

		return (
			aliases[languageCode]?.map((o) => o.value) ??
			aliases[this.#baseLanguageCode(languageCode)]?.map((o) => o.value) ??
			[]
		);
	}

	/** Returns the url of the entity a user would like to use */
	url(): string {
		return `https://www.wikidata.org/wiki/${this.entity.id}`;
	}

	allSitelinks(): Site[] {
		if (!("sitelinks" in this.entity)) {
			return [];
		}

		return typedKeys(this.entity.sitelinks ?? {});
	}

	allSitelinksInLang(lang = this.defaultLanguageCode): Site[] {
		return this.allSitelinks().filter((o) => getSitelinkData(o).lang === lang);
	}

	sitelinkUrl(site: Site): string | undefined {
		if (!("sitelinks" in this.entity)) {
			return undefined;
		}

		const title = this.entity.sitelinks?.[site]?.title;
		if (!title) {
			return undefined;
		}

		return getSitelinkUrl({ site, title });
	}

	/** Returns all PropertyIds of claims the entity has */
	allClaims(): PropertyId[] {
		if (!("claims" in this.entity)) {
			return [];
		}

		return typedKeys(this.entity.claims ?? {});
	}

	/**
	 * Returns the array of information for the requested claim.
	 *
	 * @param truthy Prefer truthy claims, the ones with the best rank (first preferred, then normal).
	 */
	claim(claim: PropertyId, truthy = true): readonly Claim[] {
		if (!("claims" in this.entity)) {
			return [];
		}

		const claims = this.entity.claims?.[claim] ?? [];
		if (truthy) {
			return truthyPropertyClaims([...claims]);
		}

		return claims;
	}

	claimDataValues(claim: PropertyId, truthy = true): ReadonlyArray<Readonly<SnakDataValue>> {
		return this.claim(claim, truthy)
			.map((o) => o.mainsnak)
			.filter((o) => o.snaktype === "value")
			.map((o) => o.datavalue);
	}

	claimStringDataValues(claim: PropertyId, truthy = true): readonly string[] {
		return this.claimDataValues(claim, truthy)
			.filter((o) => o.type === "string")
			.map((o) => o.value);
	}

	/** Returns the full image urls of the entity. Optional with the requested width. */
	imageUrls(width?: number, truthy = true): readonly string[] {
		return this.claimStringDataValues("P18", truthy)
			.map((filename) => getImageUrl(filename, width))
			.map((url) => encodeURI(url));
	}

	unicodeChars(truthy = true): readonly string[] {
		return this.claimStringDataValues("P487", truthy);
	}

	#baseLanguageCode(languageCode: string) {
		return languageCode.split("-")[0]!;
	}
}

function typedKeys<K extends keyof any>(record: Readonly<Partial<Record<K, unknown>>>): K[] {
	// oxlint-disable-next-line typescript/no-unsafe-type-assertion
	return Object.keys(record) as K[];
}
