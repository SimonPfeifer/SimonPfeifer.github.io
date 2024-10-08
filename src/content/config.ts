import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
    type: 'content',
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string(),
        active: z.boolean().default(false),
    }),
})

const projectCollection = defineCollection({
    type: 'content',
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        // Transform string to Date object
        heroImage: z.string(),
        active: z.boolean().default(false),
    }),
})

export const collections = { 
    'blog': blogCollection,
    'projects': projectCollection
};


