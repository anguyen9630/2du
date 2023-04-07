import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { LoadingSpinner } from "~/components/loading";
import { SignInButton, useUser, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";


import { api } from "~/utils/api";
import type { todoItem } from "@prisma/client";


export const HeaderContent = () => {  
  
  return (
    <header className="static inline-flex w-full p-6 bg-neutral-950 shadow-md shadow-neutral-950">
      <div className="w-1/2">
        <Link href = "/" title="Home">
          <Image src="https://i.imgur.com/VQ7H1oD.png" alt="Logo" width={180} height={180} className="h-14 w-14"/>
        </Link>
      </div>

      <SignedIn>
        <div className="w-1/2 relative p-5" >
          <div className="absolute right-2 top-1.5 px-4 py-2 rounded-xl font-semibold border-2 border-amber-400 shadow-amber-400 shadow-sm" >
            <SignOutButton>Sign Out</SignOutButton>
          </div>
        </div>
      </SignedIn>
      
      <SignedOut>
        <div className="w-1/2 relative p-5" >
          <div className="absolute right-2 top-1.5 px-4 py-2 rounded-xl font-semibold border-2 border-amber-400 shadow-amber-400 shadow-sm" >
            <SignInButton>Sign In!</SignInButton>
          </div>
        </div>
      </SignedOut>
    </header>
    
  );
};



export const MainContent = (proc : {data : todoItem[]}) => {

  const ctx = api.useContext();
  const { mutate: addMutate, isLoading: addIsPosting } = api.todos.createItem.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.todos.getAllItems.invalidate();
  },});

  const { mutate: deleteMutate, isLoading: deleteIsLoading } = api.todos.deleteItem.useMutation({
    onSuccess: () => {
      void ctx.todos.getAllItems.invalidate();
    },
  });
  const [input, setInput] = useState("");

  return (
    <div className="h-full min-h-full">
      <SignedIn>
        <div className="h-full min-h-full">
          <div className="flex p-5 h-full min-h-full w-full justify-center">
            <div className="w-full bg-neutral-800 max-w-2xl rounded-3xl shadow-inner shadow-neutral-900 p-7">
              <div className="flex gap-5 pb-3">
                
                <input placeholder="Add a Task"
                  className="rounded-2xl font-semibold shadow-sm border-2 bg-transparent border-slate-200 shadow-slate-200 px-3 py-4 w-5/6"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={addIsPosting}>
                 </input>
                
                <button 
                  className="rounded-xl font-semibold border-2 border-amber-400 shadow-amber-400 shadow-sm w-1/6 px-3 py-4"
                  onClick={() => addMutate({content: input})}
                >Add</button>
              </div>
              <div className="relative overflow-auto pt-2 h-9/10 border-y-2 border-amber-400 ">
                {proc.data.map((item) => (
                    <div key={item.id} className="pb-2">
                      <div className="relative rounded-2xl w-11/12 font-semibold shadow-sm border-2 bg-transparent border-slate-200 shadow-slate-200 px-3 py-4">
                        <div className="inline-flex w-1/2">
                          <p>{item.content}</p>
                        </div>
                        <div className="relative inline-flex w-1/2">
                          <button 
                            className="absolute inline-flex right-3 bottom-0 text-center justify-center items-center"
                            onClick={() => deleteMutate({itemId: item.id})}>
                            <Image src="https://cdn-icons-png.flaticon.com/512/1828/1828666.png" alt="Logo" width={512} height={512} className="h-4 w-4"/>
                          </button>
                        </div>
                      </div>
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

  var itemList : todoItem[] = [];

  // If logged in, check if user is on the database and create if not. If user is on the database then get the to do items
  if(user)
  {
    const { data: userData, isLoading: userIsLoading } = api.users.getCurrentUser.useQuery();
    if(!userData) {
      <div>Failed to retrieve user...</div>;
    }
    const { data : userItemData, isLoading : itemIsloading } = api.todos.getAllItems.useQuery();
    if (itemIsloading) return <LoadingSpinner />;
    itemList = userItemData || [];
  }

  return (
    <>
      <Head>
        <title>2Du</title>
        <meta name="description" content="Live Organised" />
        <link rel="icon" href="https://i.imgur.com/VQ7H1oD.png" />
      </Head>
      <main className=" h-screen min-h-screen">
        <div>
          <HeaderContent />
        </div>
        <div className=" h-5/6 ">
        <MainContent data = {itemList}/>
        </div>
        
        
      </main>
    </>
  );
};

export default Home;
