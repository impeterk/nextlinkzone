import { desc, eq } from "drizzle-orm"
import { db } from "./db"
import { pages } from "./db/schema"

export async function getUserPages(userId: string) {
    return await db.query.pages.findMany({
        where: eq(pages.userId, userId),
        orderBy: desc(pages.createdAt)
    })
}

export async function getUserPage(pagename: string) {
    return await db.query.pages.findFirst({
        where: eq(pages.id, pagename),
        with: {
            links: true
        }

    })
}