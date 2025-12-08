'use client';
import { Suspense } from 'react';
import DigitalPassLogin from '@/components/auth';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DigitalPassLogin />
    </Suspense>
  );
}