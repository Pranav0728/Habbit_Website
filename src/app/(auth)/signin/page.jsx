// pages/auth/signin.js
'use client'
import { signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();
    const signInFunction =async ()=>{
        try {
            await signIn('github')
        } catch (error) {
            console.log(error)
        }
    }
    const signOutFunction =()=>{
      try {
        signOut()
    } catch (error) {
        console.log(error)
    }
    }
  return (
    <div>
      <h1>Sign In</h1>
      <h1>{session?.user.name}</h1>
      <button onClick={signInFunction}>Sign in with GitHub</button>
      <br />
      <button onClick={signOutFunction}>Sign Out</button>
    </div>
  );
}