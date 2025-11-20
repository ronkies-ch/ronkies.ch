export const languages = {
	"de-CH": "CH",
	"de-DE": "DE",
};

export const languageIcons: Record<keyof typeof languages, string> = {
	"de-CH": "🇨🇭",
	"de-DE": "🇩🇪",
};

export const locales = Object.keys(languages) as (keyof typeof languages)[];

export const defaultLocale: keyof typeof languages = "de-CH";

export const ui: Record<keyof typeof languages, Record<string, string>> = {
	"de-CH": {},
	"de-DE": {},
} as const;
