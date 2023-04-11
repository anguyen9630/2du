import { type NextPage } from "next";
import Head from "next/head";
import { LoadingSpinner } from "~/components/loading";
import { useUser} from "@clerk/nextjs";
import { HeaderContent } from "~/components/header";
import { MainContent } from "~/components/main";


import { api } from "~/utils/api";
import type { todoItem } from "@prisma/client";


const Home: NextPage = () => {

  // Get the user data
  const user = useUser();

  let itemList : todoItem[] = [];

  // If logged in, check if user is on the database and create if not. If user is on the database then get the to do items
  if(user)
  {
    const { data: userData } = api.users.getCurrentUser.useQuery();
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
        <link rel="icon" href="favicon.ico" />
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
