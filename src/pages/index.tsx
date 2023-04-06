import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SignInButton, useUser, SignOutButton, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

import { api } from "~/utils/api";

const topBar = () => {  
  
  return (
    <div className="static inline-flex w-full p-6 bg-neutral-950 shadow-md shadow-neutral-950">
      <div className="w-1/2 bg-red-800">
        <div>
          <img src="../public/apple-touch-icon.png" className=""/>
        </div>
      </div>
      
      <SignedOut>
        <div className="w-1/2 relative p-5">
          <div className="absolute right-2 top-0 px-4 py-2 rounded-xl font-bold border-2 border-amber-400 shadow-amber-400 shadow">
            <SignInButton>Sign In!</SignInButton>
          </div>
        </div>
      </SignedOut>
      
    </div>
  );
};

const welcomePage = () => {
  return (
    <div className="">
    </div>
  )
};

const ApplicationPage = () => {
  return (
    <div className="">
      <div className="flex h-screen py-20 w-full justify-center">
        <div className="w-full bg-neutral-800 max-w-2xl rounded-3xl shadow-inner shadow-neutral-900 p-7">
          <div className="flex gap-5 pb-3">
            <input placeholder="Add a Task" className="rounded-2xl bg-neutral-700 font-semibold shadow-md shadow-neutral-900 px-3 py-4 w-5/6"></input>
            <button className="rounded-2xl bg-amber-400 text-neutral-950 font-bold w-1/6 shadow-md shadow-neutral-900 px-3 py-4">Add</button>
          </div>
          
        </div>
      </div>
    </div>
  )
};

const Home: NextPage = () => {

  // Get the user data
  const user = useUser();

  // Get all to do items from the database
  const { data, isLoading } = api.users.getUserData.useQuery({userId: user.user?.id || ""});

  if (isLoading) return <div>Loading...</div>;
  //if (!data) return <div>Failed to load</div>;
  console.log(data)

  return (
    <>
      <Head>
        <title>2Du</title>
        <meta name="description" content="Live Organised" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div>
          {topBar()}
        </div>
        
        
      </main>
    </>
  );
};

export default Home;
