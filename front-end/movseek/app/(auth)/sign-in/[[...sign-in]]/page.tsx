'use client';

import React from 'react';
import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  return <SignIn fallbackRedirectUrl={redirect || '/'} />;
};

export default Page;
