import { ui, defaultLocale, languages, locales } from './ui';

export function getLangFromUrl(url: URL) {
    const [, _basePath, lang] = url.pathname.split('/'); // TOOD: remove _basePath once real domain is registered
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLocale;
}


export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
        return l === defaultLocale ? path : `/${l}${path}`
    }
}

export function localizedContentPath(url: URL, path: string) {
    const test = getLangFromUrl(url);
    console.log(test);

    return `${getLangFromUrl(url).toLowerCase()}/${path}`
}

export function getLocalizedStaticPaths() {
    return [{ params: { locale: "" } }, ...locales.map((l) => ({ params: { locale: l } }))];

}