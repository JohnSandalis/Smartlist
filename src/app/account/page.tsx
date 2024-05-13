import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import BackButton from '@/components/ui/BackButton'

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
    <button className='mx-auto mt-4 btn-white'>Log out</button>
  </div>
  )
}