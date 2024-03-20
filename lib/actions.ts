'use server'

import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { ZodError, z } from 'zod';
import { db } from './db';
import { pages } from './db/schema';
import { revalidatePath } from 'next/cache';
import { LibsqlError } from '@libsql/client';
import { eq } from 'drizzle-orm';

export async function navigateToCreate(formData: FormData) {
    const username = formData.get('username') || ''
    redirect(`/create?username=${username}`)
}

export async function logInWithProvider(formData: FormData) {
        const provider = formData.get('provider') as string
        await signIn(provider)
}

export async function createNewPage(prevState: any, formData: FormData) {
    const session = await auth()
    let pagename
    try {
        if (!session?.user?.id) throw new Error('Unauthorized user, please log in')
        pagename = z.object({
            pagename: z.string().min(5, 'please provide at least 5 charactes').max(20, 'please provide maximumm 20 characters')
        }).parse({
            pagename: formData.get('pagename')
        }).pagename
        
        await db.insert(pages).values({id: pagename, userId: session.user.id, image: session.user.image})
        
    } catch (err) {
        if (err instanceof ZodError) {
            return {text: err.errors[0].message}
        }
        if (err instanceof LibsqlError) {
            return {text: 'Failed to create new page'}
        }
        console.log(err)
        return  {text: 'Something went wrong'}  
    }
    revalidatePath('/dashboard/pages')
    return {success: true, pagename}
}
export async function deletePage({pagename}: {pagename: string}) {
    //   await new Promise((resolve) => setTimeout(resolve, 5000))
    // console.log(pagename)
    await db.delete(pages).where(eq(pages.id, pagename))
    revalidatePath('/dashboard/pages')
    redirect('/dashboard/pages')
}