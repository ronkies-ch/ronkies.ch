import type { AnyEntryMap, CollectionEntry } from "astro:content";
import { ui, defaultLocale, type languages, locales } from "./ui";

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split("/"); 
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLocale;
}

export function getPathWithoutLang(url: URL) {
	const [, lang, ...rest] = url.pathname.split("/");

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

type FilterNonEmpty<T> = {
	[K in keyof T as keyof T[K] extends never ? never : K]: T[K];
};

type FilterEntriesByData = FilterNonEmpty<{
	[K in keyof AnyEntryMap]: {
		[ID in keyof AnyEntryMap[K] as AnyEntryMap[K][ID]["data"] extends {
			locale: string;
		}
			? ID
			: never]: AnyEntryMap[K][ID];
	};
}>;

export function getLocalizedStaticPaths<
	E extends Record<string, CollectionEntry<keyof FilterEntriesByData>[]>,
	C extends Record<string, CollectionEntry<keyof FilterEntriesByData>[]>,
>(entries: E, collections?: C) {
	return ["", ...locales].map((locale = defaultLocale) => {
		const entryMap = (Object.entries(entries) as Entries<E>).reduce(
			(acc, [key, collection]) => {
				acc[key] =
					collection.find((p) => p.data.locale === locale) ??
					collection.find((e) => e.data.locale === defaultLocale);
				return acc;
			},
			{} as { [K in keyof E]: E[K][number] | undefined },
		);

		const collectionMap = (
			Object.entries(collections ?? []) as Entries<C>
		).reduce(
			(acc, [key, collection]) => {
				const fallback = collection.filter(
					({ data }) => data.locale === defaultLocale,
				);

				acc[key] = fallback.map(
					(e) =>
						collection.find(
							({ data }) =>
								e.data.translationId === data.translationId &&
								data.locale === locale,
						) ?? e,
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
