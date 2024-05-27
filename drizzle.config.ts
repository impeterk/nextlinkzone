import type { Config } from 'drizzle-kit';
export default {
  schema: './lib/db/schema.ts',
  driver: 'turso',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  out: './drizzle',
} satisfies Config;
