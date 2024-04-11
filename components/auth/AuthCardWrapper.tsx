'use client';

import React from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import AuthCardSocial from '@/components/auth/AuthCardSocial';
import AuthCardHeader from '@/components/auth/AuthCardHeader';
import AuthCardFooter from '@/components/auth/AuthCardFooter';

interface AuthCardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  label: string;
  backButtonLabel: string;
  backButtonTitle: string;
  onBackButtonClick: string;
  showSocialLogin?: boolean;
  isPending?: boolean;
}

const AuthCardWrapper = ({
  children,
  headerLabel,
  label,
  backButtonLabel,
  backButtonTitle,
  onBackButtonClick,
  showSocialLogin,
  isPending,
}: AuthCardWrapperProps) => {
  return (
    <Card className="w-[450px] shadow-lg shadow-slate-800/40 border-0 border-slate-800/35 relative z-10 items-center overflow-hidden p-[2px]">
      <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#1F3B41_20deg,transparent_120deg)]"></div>
      <CardHeader className="relative z-10 bg-white rounded-t-md">
        <AuthCardHeader label={label} title={headerLabel} />
      </CardHeader>
      <CardContent className="space-y-4 relative z-10 bg-white">
        {showSocialLogin && <AuthCardSocial isPending={isPending} />}
        {children}
      </CardContent>
      <CardFooter className='relative z-10 bg-white rounded-b-md'>
        <AuthCardFooter
          label={backButtonLabel}
          title={backButtonTitle}
          href={onBackButtonClick}
        />
      </CardFooter>
    </Card>
  );
};
export default AuthCardWrapper;
