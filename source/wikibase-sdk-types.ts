export type ClaimSimplified = unknown;

export interface EntitySimplified {
	readonly type: string;
	readonly id: string;
	readonly modified?: string;
	readonly aliases?: Readonly<Record<string, readonly string[]>>;
	readonly claims?: Readonly<Record<string, readonly ClaimSimplified[]>>;
	readonly descriptions?: Readonly<Record<string, string>>;
	readonly labels?: Readonly<Record<string, string>>;
	readonly sitelinks?: Readonly<Record<string, string>>;
}
