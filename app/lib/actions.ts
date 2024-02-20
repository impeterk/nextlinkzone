'use server'

import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function navigateToCreate(formData: FormData) {
    const username = formData.get('username') || ''
    redirect(`/create?username=${username}`)
}

export async function logInWithProvider(formData: FormData) {
    const provider = formData.get('provider')
    console.log(provider)
}