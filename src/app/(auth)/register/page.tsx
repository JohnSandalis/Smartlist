import Link from "next/link";
import BackButton from "@/components/ui/BackButton";
import RegisterForm from "@/components/form/Register";
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function RegisterPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (!error && data?.user) {
    redirect('/');
  }
  return (
    <>
      <BackButton />
      <div className="flex min-h-full sm:mx-auto sm:w-full sm:max-w-sm flex-1 flex-col justify-center mt-2 px-4 py-6 lg:px-8 lg:py-8 bg-white shadow-lg rounded-lg">
        <div>
          <h2 className="text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
            Ξεκίνα τις αγορές σου
          </h2>
        </div>

        <div className="mt-2">
          <RegisterForm />

          <p className="mt-10 text-center text-sm text-gray-500">
            Είσαι μέλος?{' '}
            <Link href="/login" className="font-semibold leading-6 text-primary hover:text-primary-light">
              Συνδέσου τώρα
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}