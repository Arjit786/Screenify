import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
    schema: './lib/schema.ts',
    out: './drizzle',
    driver: 'd1-http',
    dbCredentials: {
        accountId: process.env.DATABASE_URL!,
        databaseId: process.env.DATABASE_URL!,
        token: process.env.DATABASE_URL!,
    },
    dialect: 'postgresql' as const,
} as Config;