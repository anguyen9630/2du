import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SignInButton, useUser, SignOutButton } from "@clerk/nextjs";

import { api } from "~/utils/api";

const Home: NextPage = () => {

  // Get the user data
  const user = useUser();

  // Get all to do items from the database
  const { data } = api.todos.getAll.useQuery();

  return (
    <>
      <Head>
        <title>2Du</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div>
              {user.isSignedIn ? (<SignOutButton/>) : (<SignInButton />)}
        </div>
        <div className="flex h-screen py-20 w-full justify-center">
          <div className="w-full bg-neutral-800 max-w-2xl rounded-3xl drop-shadow-xl p-7">
            <div className="flex gap-5 pb-3">
              <input placeholder="Add a Task" className="rounded-2xl bg-neutral-700 drop-shadow-xl px-3 py-4 w-5/6"></input>
              <button className="rounded-2xl bg-amber-400 text-neutral-950 font-bold w-1/6 drop-shadow-xl px-3 py-4">Add</button>
            </div>
            <div>
              {data?.map((todo) => (
                <div key={todo.id} className="pb-3 pt-2">
                  <div className="px-3 py-4 bg-neutral-600 drop-shadow-xl rounded-2xl"> 
                    {todo.content} 
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </main>
    </>
  );
};

export default Home;
