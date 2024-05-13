import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import BackButton from '@/components/ui/BackButton'
import { logout } from '@/app/(auth)/logout/actions'

export default async function AccountPage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (<div className='flex flex-col items-start'>
    <BackButton />
    <div className='py-4'>
      <p className='text-md'>
        Email: {data.user.email}
      </p>
    </div>
    <form action={logout} className='mx-auto mt-4'>
      <button type="submit" className='btn-white'>Log out</button>
    </form>
  </div>
  )
}