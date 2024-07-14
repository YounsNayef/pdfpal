"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client'; // Adjust this import path as needed
import { Loader2 } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  // Adjust the input parameter to void as expected by the TRPC query
  const { isLoading, isError, data, error } = trpc.authCallback.useQuery(
    undefined, // Use undefined or void as the input
    {
      onSuccess: (data: any) => {
        if (data.success) {
          // User is synced to db
          router.push(origin ? `/${origin}` : '/dashboard');
        }
      },
      onError: (error: any) => {
        if (error.data?.code === 'UNAUTHORIZED') {
          router.push('/sign-in');
        }
      },
      retry: true,
      retryDelay: 500,
    }
  );

  if (isLoading) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <h3 className="font-semibold text-xl">
            Setting up your account...
          </h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-xl text-red-500">
            Error: {error.message}
          </h3>
        </div>
      </div>
    );
  }

  return null; // or return some other component or null if not loading or error
};

export default Page;