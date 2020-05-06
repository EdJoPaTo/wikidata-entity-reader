export type ClaimSimplified = unknown;

export interface EntitySimplified {
	readonly type: string;
	readonly id: string;
	readonly modified?: string;
	readonly aliases?: Record<string, readonly string[]>;
	readonly claims?: Record<string, readonly ClaimSimplified[]>;
	readonly descriptions?: Record<string, string>;
	readonly labels?: Record<string, string>;
	readonly sitelinks?: Record<string, string>;
}
