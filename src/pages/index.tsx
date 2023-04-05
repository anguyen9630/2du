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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div>
          {user.isSignedIn ? (<SignOutButton/>) : (<SignInButton />)}
        </div>
        <div>
          {data?.map((todo) => (<div key={todo.id}> {todo.content} </div>))}
        </div>
      </main>
    </>
  );
};

export default Home;
