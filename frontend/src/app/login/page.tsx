import { login, signup } from './actions'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ThemeToggle"
import Link from "next/link"
import { Stethoscope, ShieldCheck, ArrowLeft, LogIn, UserPlus, Sparkles, AlertCircle, TestTube, ChevronRight } from "lucide-react"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#03242E] text-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-[#00C9A7] selection:text-[#03242E]">
      
      <div className="w-full max-w-md space-y-6 relative z-10">
        
        {/* Back Link & Theme Toggle */}
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="btn-pill-outline text-xs inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <ThemeToggle />
        </div>

        {/* Card */}
        <div className="bg-[#073543] rounded-[32px] border border-white/10 p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2 pb-4 border-b border-white/10">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#00C9A7]/10 text-[#00C9A7] flex items-center justify-center border border-[#00C9A7]/20 mb-3">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Clinician Portal</h1>
            <p className="text-xs text-slate-300">
              Sign in with practitioner credentials or launch Demo Access to test patient tools.
            </p>
          </div>

          {/* Alert Error */}
          {params?.error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Authentication Notice:</span> {params.error}
              </div>
            </div>
          )}

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-200">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="dr.smith@hospital.org" 
                required 
                className="h-12 bg-[#0A3D4C] border-white/10 text-white placeholder:text-slate-400 rounded-xl focus:ring-[#00C9A7]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold text-slate-200">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="h-12 bg-[#0A3D4C] border-white/10 text-white rounded-xl focus:ring-[#00C9A7]"
              />
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button formAction={login} className="btn-pill-mint w-full text-xs font-bold flex items-center justify-center gap-2 py-3.5">
                <LogIn className="w-4 h-4" />
                <span>Log In to Portal</span>
              </button>

              <button formAction={signup} className="btn-pill-outline w-full text-xs font-semibold flex items-center justify-center gap-2 py-3">
                <UserPlus className="w-4 h-4" />
                <span>Create Practitioner Account</span>
              </button>
            </div>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
              <span className="bg-[#073543] px-3 text-slate-400 font-bold">Or Test Platform</span>
            </div>
          </div>

          {/* Quick Demo Buttons */}
          <div className="space-y-3">
            <Link href="/dashboard" className="w-full block">
              <button className="btn-pill-white w-full text-xs font-bold flex items-center justify-center gap-2 py-3.5">
                <Sparkles className="w-4 h-4 text-[#00C9A7]" />
                <span>Demo Clinician Access (Bypass Login)</span>
              </button>
            </Link>

            <Link href="/assessment" className="w-full block text-center">
              <button className="text-xs font-semibold text-slate-300 hover:text-[#00C9A7] flex items-center justify-center gap-1.5 mx-auto transition-colors">
                <TestTube className="w-3.5 h-3.5 text-[#00C9A7]" />
                <span>Launch Diagnostic Sandbox</span>
              </button>
            </Link>
          </div>

        </div>

      </div>
    </main>
  )
}
