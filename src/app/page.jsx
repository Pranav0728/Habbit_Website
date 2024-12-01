// pages/index.js
'use client'
import HabitTrackerChart from "./components/HabbitChart";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  const signOutFunction =()=>{
    try {
      signOut()
  } catch (error) {
      console.log(error)
  }
  }
  return (
    <div>
      <h1>Habit Tracker</h1>
      <h1>{session?.user.name}</h1>
      <HabitTrackerChart userId={session?.user.id} />
      <button onClick={signOutFunction}>Sign Out</button>
    </div>
  );
}
