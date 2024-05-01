import { desc, eq } from 'drizzle-orm';
import { db } from './db';
import { pages } from './db/schema';
import { unstable_noStore } from 'next/cache';

export async function getUserPages(userId: string) {
  // unstable_noStore()
  return await db.query.pages.findMany({
    where: eq(pages.userId, userId),
    orderBy: desc(pages.createdAt),
  });
}

export async function getUserPage(pagename: string) {
  unstable_noStore();
  return await db.query.pages.findFirst({
    where: eq(pages.id, pagename),
    with: {
      links: true,
    },
  });
}
