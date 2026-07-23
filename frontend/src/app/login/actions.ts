'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect('/login?error=Please fill in both email and password fields.')
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }
  } catch (err: any) {
    if (err.digest?.startsWith('NEXT_REDIRECT')) throw err;
    redirect('/login?error=Supabase authentication service unavailable. Try Demo Clinician Access below.')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect('/login?error=Please fill in both email and password fields.')
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }
  } catch (err: any) {
    if (err.digest?.startsWith('NEXT_REDIRECT')) throw err;
    redirect('/login?error=Supabase signup service unavailable. Try Demo Clinician Access below.')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
