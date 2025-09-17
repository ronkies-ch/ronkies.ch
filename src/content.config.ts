import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const flavors = defineCollection({
    loader: file("src/content/flavor/flavors.json"),
    schema: ({ image }) => z.object({
        alias: z.string(),
        label: z.string(),
        color: z.string(),
        icon: image(),
        new: z.boolean().optional()
    })
})

export const collections = { flavors }