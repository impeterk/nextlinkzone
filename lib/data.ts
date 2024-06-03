import { desc, eq } from 'drizzle-orm';
import { db } from './db';
import { links, pages } from './db/schema';
import { unstable_noStore } from 'next/cache';

export async function getUserPages(userId: string) {
  // unstable_noStore()
  return await db.query.pages.findMany({
    where: eq(pages.userId, userId),
    orderBy: desc(pages.createdAt),
  });
}

export async function getUserPageWithLinks(pagename: string) {
  unstable_noStore();
  return await db.query.pages.findFirst({
    where: eq(pages.id, pagename),
    with: {
      links: true,
    },
  });
}

export async function getUserPage(pageId: string) {
  unstable_noStore();
  return await db.query.pages.findFirst({
    where: eq(pages.id, pageId),
  });
}

export async function getPageLinks(pageId: string) {
  // await new Promise(resolve => setTimeout(resolve, 3500))
  unstable_noStore();
  return await db.query.links.findMany({
    where: eq(links.pageId, pageId),
  });
}
