import Link from "next/link";
import BackButton from "@/components/ui/BackButton";
import LogInForm from "@/components/form/LogIn"

export default function LoginPage() {
  return (
    <>
      <BackButton />
      <div className="flex min-h-full sm:mx-auto sm:w-full sm:max-w-sm flex-1 flex-col justify-center mt-2 px-4 py-6 lg:px-8 lg:py-8 bg-white shadow-lg rounded-lg">
        <div>
          <h2 className="text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
            Συνδέσου στον λογαριασμό σου
          </h2>
        </div>

        <div className="mt-2">
          <LogInForm />

          <p className="mt-10 text-center text-sm text-gray-500">
            Δεν είσαι μέλος?{' '}
            <Link href="/register" className="font-semibold leading-6 text-primary hover:text-primary-light">
              Ξεκίνα τις αγορές σου
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}