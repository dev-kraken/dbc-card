'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const AuthCardSocial = () => {
  return (
    <>
      <div className="flex w-full items-center gap-x-2">
        <Button variant="outline" className="w-full text-xs font-medium gap-x-2" size="lg">
          <FcGoogle className="size-5" />
          Google
        </Button>
        <Button variant="outline" className="w-full text-xs gap-x-2 font-medium" size="lg">
          <FaFacebook className="size-5 text-[#3b5998]" />
          Facebook
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <Separator className="w-28" />
        <span className="text-muted-foreground font-normal text-xs">
          or continue with email
        </span>
        <Separator className="w-28" />
      </div>
    </>
  );
};

export default AuthCardSocial;
