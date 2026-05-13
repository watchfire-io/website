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

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
      howto: howtoSchema.optional(),
    }),
  },
});

export default defineConfig();
