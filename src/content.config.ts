import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  loader: glob({ base: "src/content/pages", pattern: "*/*.md" }),
  schema: ({ image }) => z.object({
    title: z.string().optional(),
    image: image().optional()
  }),
});

const sections = defineCollection({
  loader: glob({ base: "src/content/pages", pattern: "**/sections/*.md" }),
  schema: ({ image }) => z.object({
    heading: z.string().optional(),
    image: image().optional(),
    action: z.string().optional()
  }),
});

const flavors = defineCollection({
  loader: file("src/content/collections/flavor/flavors.json"),
  schema: ({ image }) => z.object({
    alias: z.string(),
    label: z.string(),
    color: z.string(),
    icon: image(),
    ingredients: z.string(),
    new: z.boolean().optional(),
  })
})

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/collections/news" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    pubDate: z.date(),
  })
})

export const collections = { flavors, news, pages, sections }