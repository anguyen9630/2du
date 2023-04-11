import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { api } from "~/utils/api";
import type { todoItem } from "@prisma/client";

import Image from "next/image";


export const MainContent = (proc : {data : todoItem[]}) => {

    const ctx = api.useContext();
    const { mutate: addMutate, isLoading: addIsPosting } = api.todos.createItem.useMutation({
      onSuccess: () => {
        setInput("");
        void ctx.todos.getAllItems.invalidate();
    },});
  
    const { mutate: deleteMutate, isLoading: deleteIsPosting } = api.todos.deleteItem.useMutation({
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
                              onClick={() => deleteMutate({itemId: item.id})}
                              disabled={deleteIsPosting}>
                              <Image src="/delete_button.png" alt="Logo" width={512} height={512} className="h-4 w-4"/>
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