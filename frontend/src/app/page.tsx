import { AssessmentForm } from "@/components/AssessmentForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Cancer Courage
          </h1>
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
            Prostate Cancer Risk Assessment & Clinical Reasoning Engine
          </p>
        </div>

        <Card className="shadow-lg border-zinc-200 dark:border-zinc-800">
          <CardHeader className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 rounded-t-lg pb-6">
            <CardTitle className="text-2xl">Clinical Input Parameters</CardTitle>
            <CardDescription className="text-base mt-2">
              Enter the patient's diagnostic data to calculate the localized risk score and generate a clinical narrative.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 bg-white dark:bg-zinc-900 rounded-b-lg">
            <AssessmentForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
