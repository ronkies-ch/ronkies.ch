import {
	extendI18nLoaderSchema,
	i18nLoader,
	localized,
} from "astro-loader-i18n";
import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { locales } from "./i18n/ui";

const pages = defineCollection({
	loader: i18nLoader({ base: "src/content/pages", pattern: "**/*.md" }),
	schema: ({ image }) =>
		extendI18nLoaderSchema(
			z.object({
				title: z.string().optional(),
				image: image().optional(),
				inNavigation: z.boolean().optional(),
			}),
		),
});

const sections = defineCollection({
	loader: i18nLoader({
		base: "src/content/pages",
		pattern: "**/sections/*.md",
	}),
	schema: ({ image }) =>
		extendI18nLoaderSchema(
			z.object({
				heading: z.string().optional(),
				image: image().optional(),
				action: z.string().optional(),
			}),
		),
});

const flavors = defineCollection({
	loader: file("src/content/collections/flavor/flavors.json"),
	schema: ({ image }) =>
		z.object({
			alias: z.string(),
			label: localized(z.string(), locales, true),
			color: z.string(),
			icon: image(),
			ingredients: localized(z.string(), locales, true),
			new: z.boolean().optional(),
		}),
});

const news = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "src/content/collections/news" }),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		pubDate: z.date(),
	}),
});

export const collections = { flavors, news, pages, sections };
