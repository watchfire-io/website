import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

const howtoStepSchema = z.object({
  name: z.string(),
  text: z.string(),
  url: z.string().optional(),
});

const howtoSchema = z.object({
  name: z.string(),
  totalTime: z.string().optional(),
  steps: z.array(howtoStepSchema).min(1),
});

const authorSchema = z.union([
  z.string().min(1),
  z.object({
    name: z.string().min(1),
    url: z.string().url().optional(),
    title: z.string().min(1).optional(),
  }),
]);

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      howto: howtoSchema.optional(),
    }),
  },
});

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string(),
      summary: z.string(),
      tags: z.array(z.string()).default([]),
      image: z.string().optional(),
      canonical: z.string().url().optional(),
      draft: z.boolean().default(false),
      author: authorSchema.optional(),
    }),
  },
});

export default defineConfig();
