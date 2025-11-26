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

export const ui = {
	"de-CH": {
		"footer.socialMedia": "Soziali Medie",
		"footer.contactUs": "Kontaktier üs",
		"footer.address": "Da findet mer üs",
		ingredients: "Inhaltsstoff",
		learnMore: "Meh erfahre",
	},
	"de-DE": {
		"footer.socialMedia": "Soziale Medien",
		"footer.contactUs": "Kontaktiere uns",
		"footer.address": "Hier sind wir zu finden",
		ingredients: "Inhaltsstoffe",
		learnMore: "Mehr erfahren",
	},
} as const;
