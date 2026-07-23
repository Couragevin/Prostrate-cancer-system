import { login, signup } from './actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Stethoscope, ShieldCheck, ArrowLeft, LogIn, UserPlus, Sparkles, AlertCircle, TestTube } from "lucide-react"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4 relative overflow-hidden">
      
      {/* Decorative Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project Overview</span>
        </Link>

        <Card className="shadow-xl border-slate-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md overflow-hidden">
          <CardHeader className="text-center space-y-2 bg-slate-50/80 dark:bg-zinc-900/80 border-b border-slate-100 dark:border-zinc-800 pb-6">
            <div className="mx-auto w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20 mb-2">
              <Stethoscope className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Clinician Portal</CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              Sign in with your clinical credentials or launch Demo Mode to access patient records and risk stratification tools.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 space-y-5">
            {/* Error / Warning Alert Banner */}
            {params?.error && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Authentication Notice:</span> {params.error}
                  <p className="mt-1 text-[11px] opacity-90">
                    Tip: Use the <strong>Demo Clinician Access</strong> button below to bypass Supabase credentials during evaluation.
                  </p>
                </div>
              </div>
            )}

            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="dr.smith@hospital.org" 
                  required 
                  className="h-10 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  className="h-10 text-sm"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <Button formAction={login} className="w-full h-10 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center justify-center gap-2 rounded-lg">
                  <LogIn className="w-4 h-4" />
                  <span>Log In to Portal</span>
                </Button>

                <Button formAction={signup} variant="outline" className="w-full h-10 text-xs font-semibold flex items-center justify-center gap-2 rounded-lg">
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </Button>
              </div>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                <span className="bg-white dark:bg-zinc-900 px-2 text-slate-400 font-bold">Or Test Platform</span>
              </div>
            </div>

            {/* Quick Demo Access Buttons for Testers & Evaluators */}
            <div className="space-y-2.5">
              <Link href="/dashboard" className="w-full">
                <Button variant="secondary" className="w-full h-10 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-2 rounded-lg">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>Demo Clinician Access (Bypass Login)</span>
                </Button>
              </Link>

              <Link href="/assessment" className="w-full">
                <Button variant="ghost" className="w-full h-10 text-slate-600 dark:text-slate-400 hover:text-teal-600 text-xs font-medium flex items-center justify-center gap-2">
                  <TestTube className="w-4 h-4 text-teal-500" />
                  <span>Launch Diagnostic Assessment Sandbox</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  )
}
