import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, useUser, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";


import { api } from "~/utils/api";
import type { todoItem } from "@prisma/client";


const headerContent = () => {  
  
  return (
    <header className="static inline-flex w-full p-6 bg-neutral-950 shadow-md shadow-neutral-950">
      <div className="w-1/2">
        <Link href = "/" title="Home">
          <Image src="https://i.imgur.com/VQ7H1oD.png" alt="Logo" width={180} height={180} className="h-14 w-14"/>
        </Link>
      </div>

      <SignedIn>
        <div className="w-1/2 relative p-5" >
          <div className="absolute right-2 top-1.5 px-4 py-2 rounded-xl font-bold border-2 border-amber-400 shadow-amber-400 shadow" >
            <SignOutButton>Sign Out</SignOutButton>
          </div>
        </div>
      </SignedIn>
      
      <SignedOut>
        <div className="w-1/2 relative p-5" >
          <div className="absolute right-2 top-1.5 px-4 py-2 rounded-xl font-bold border-2 border-amber-400 shadow-amber-400 shadow" >
            <SignInButton>Sign In!</SignInButton>
          </div>
        </div>
      </SignedOut>
    </header>
    
  );
};



const mainContent = (data : todoItem[]) => {
  return (
    <div className="h-full min-h-full">
      <SignedIn>
        <div className="h-full min-h-full">
          <div className="flex p-5 h-full min-h-full w-full justify-center">
            <div className="w-full bg-neutral-800 max-w-2xl rounded-3xl shadow-inner shadow-neutral-900 p-7">
              <div className="flex gap-5 pb-3">
                <input placeholder="Add a Task" className="rounded-2xl font-semibold shadow-sm border-2 bg-transparent border-slate-200 shadow-slate-200 px-3 py-4 w-5/6"></input>
                <button className="rounded-xl font-bold border-2 border-amber-400 shadow-amber-400 shadow-sm w-1/6 px-3 py-4">Add</button>
              </div>
              <div className="relative overflow-auto pt-2 h-9/10 border-y-2 border-amber-400 ">
                {data?.map((item) => (
                    <div className="pb-2">
                      <div key={item.id} className="rounded-2xl w-11/12 font-semibold shadow-sm border-2 bg-transparent border-slate-200 shadow-slate-200 px-3 py-4">{item.content}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="pl-48 flex pt-20 border-b border-slate-200">
          <div className=" max-w-2xl">
            <p className="text-8xl pb-10 font-semibold">
              Live organised
            </p>
            <p className="text-5xl pb-40">
              A minimalist companion to help you get things done.
            </p>
            <p className="text-3xl pb-40">
              Login to get started!
            </p>
          </div>
        </div>
      </SignedOut>
    </div>
  )
};

const Home: NextPage = () => {

  // Get the user data
  const user = useUser();

  // Get all to do items from the database
  const { data, isLoading } = api.todos.getAll.useQuery({userId: user.user?.id || ""});

  if (isLoading) return <div>Loading...</div>;
  //if (!data) return <div>Failed to load</div>;
  console.log(data)

  return (
    <>
      <Head>
        <title>2Du</title>
        <meta name="description" content="Live Organised" />
        <link rel="icon" href="https://i.imgur.com/VQ7H1oD.png" />
      </Head>
      <main className=" h-screen min-h-screen">
        <div>
          {headerContent()}
        </div>
        <div className=" h-5/6 ">
          {mainContent(data || [])}
        </div>
        
        
      </main>
    </>
  );
};

export default Home;
