'use server'

import { eq } from "drizzle-orm"
import { db } from "../db"
import { pages } from "../db/schema"

export async function getUserPages(userId: string) {
    return await db.query.pages.findMany({
        where: eq(pages.userId, userId)
    })
}

export async function getUserPage(pagename: string) {
    return await db.query.pages.findFirst({
        where: eq(pages.id, pagename)
    })
}