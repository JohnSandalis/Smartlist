'use client'
import { useRouter } from 'next/navigation'
import { IconButton } from '@mui/material'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function BackButton() {
  const router = useRouter()

  return (
    <IconButton type="button" onClick={() => router.back()}>
      <ArrowLeftIcon width="24px" height="24px" />
    </IconButton>
  )
}