// pages/auth/error.js
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Optionally, redirect or show some message on error
    console.log("Authentication failed. Redirecting...");
    // router.push('/signin'); // If you want to redirect the user to sign in
  }, []);

  return (
    <div>
      <h1>Error during authentication</h1>
      <p>There was an error during the authentication process. Please try again.</p>
    </div>
  );
};

export default ErrorPage;
