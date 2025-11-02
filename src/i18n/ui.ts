export const languages = {
    'de-CH': 'Schwiizerdütsch',
    'de-DE': 'Hochdeutsch',
};

export const locales = Object.keys(languages) as (keyof typeof languages)[]

export const defaultLocale: keyof typeof languages = 'de-CH';

export const ui: Record<keyof typeof languages, Record<string, string>> = {
    "de-CH": {

    },
    "de-DE": {

    },
} as const;