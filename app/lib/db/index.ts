import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema'
import { eq } from 'drizzle-orm';

const client = createClient({ url: process.env.DATABASE_URL!, authToken: process.env.DATABASE_AUTH_TOKEN });

export const db = drizzle(client, {schema});

export async function getUserPages(userId: string) {
    return await db.query.pages.findMany({
        where: eq(schema.pages.userId, userId)
    })
}

export async function getUserPage(pagename: string) {
    return await db.query.pages.findFirst({
        where: eq(schema.pages.id, pagename),
        with: {
            links: true
        }

    })
    // return await db.select().from(schema.pages).innerJoin(schema.links, eq(schema.pages.id, schema.links.pageId))
}
