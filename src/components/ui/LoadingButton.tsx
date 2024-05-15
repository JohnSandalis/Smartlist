'use client';

import * as React from "react";
import { PropsWithChildren } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Button, ButtonProps } from "@/components/ui/Button"; // Ensure correct path

interface LoadingButtonProps extends PropsWithChildren, ButtonProps {
  loading: boolean;
}

export default function LoadingButton({
  children,
  loading: isLoading,
  ...props
}: LoadingButtonProps) {
  const combinedButtonClassNames = `${props.className ?? ''} !flex !items-center !justify-center relative`;

  return (
    <Button
      disabled={isLoading}
      {...props}
      className={combinedButtonClassNames}
    >
      {isLoading && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white !w-5 !h-5"><CircularProgress className="!w-full !h-full" color="inherit" /></div>}
      {children}
    </Button>
  );
}
