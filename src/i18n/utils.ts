import type { AnyEntryMap, CollectionEntry } from "astro:content";
import { ui, defaultLocale, languages, locales } from "./ui";

export function getLangFromUrl(url: URL) {
	const [, _basePath, lang] = url.pathname.split("/"); // TOOD: remove _basePath once real domain is registered
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLocale;
}

export function getPathWithoutLang(url: URL) {
	const [, _basePath, lang, ...rest] = url.pathname.split("/"); // TOOD: remove _basePath once real domain is registered

	if ((locales as string[]).includes(lang)) {
		return rest.join("/");
	}

	return [lang, ...rest].join("/");
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLocale]) {
		return ui[lang][key] || ui[defaultLocale][key];
	};
}

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		return l === defaultLocale ? path : `/${l}${path}`;
	};
}

export function translateField<T>(
	field: { [L in keyof typeof languages]?: T } | T,
	url: URL,
): T {
	if (typeof field === "object" && field !== null && "de-CH" in field) {
		return field[getLangFromUrl(url)] ?? (field[defaultLocale] as T);
	}

	return field as T;
}

type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

export function getLocalizedStaticPaths<
	E extends Record<string, CollectionEntry<keyof AnyEntryMap>[]>,
	C extends Record<string, CollectionEntry<keyof AnyEntryMap>[]>,
>(entries: E, collections?: C) {
	return ["", ...locales].map((locale = defaultLocale) => {
		const entryMap = (Object.entries(entries) as Entries<E>).reduce(
			(acc, [key, collection]) => {
				acc[key] =
					collection.find(
						(p) => !("locale" in p.data) || p.data.locale === locale,
					) ??
					collection.find(
						(e) => !("locale" in e.data) || e.data.locale === defaultLocale,
					);
				return acc;
			},
			{} as { [K in keyof E]: E[K][number] | undefined },
		);

		const collectionMap = (
			Object.entries(collections ?? []) as Entries<C>
		).reduce(
			(acc, [key, collection]) => {
				acc[key] = collection.filter(
					(p) =>
						!("locale" in p.data) ||
						p.data.locale === locale ||
						p.data.locale === defaultLocale,
				);
				return acc;
			},
			{} as { [K in keyof C]: C[K][number][] | undefined },
		);

		return {
			params: { locale: locale || undefined },
			props: { ...entryMap, ...collectionMap },
		};
	});
}
