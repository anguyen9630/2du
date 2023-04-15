import { useState, Fragment } from "react";
import React from "react";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { api } from "~/utils/api";
import type { todoItem } from "@prisma/client";

import { DotsVerticalIcon, CircleIcon, CheckCircledIcon, DragHandleHorizontalIcon } from "@radix-ui/react-icons";

import { Typography, Dialog, DialogBody, DialogHeader, DialogFooter} from "@material-tailwind/react";




import Image from "next/image";

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';


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

    const [editIsOpen, setEditIsOpen] = useState(false);
    const handleOpen = () => setEditIsOpen((cur) => !cur);
  
    return (
      <Fragment>
        <div className="h-full min-h-full border-slate-200">
          <SignedIn>
            <div className="h-full min-h-full">
              <div className="flex p-5 h-full min-h-full w-full justify-center">
                <div className="w-full bg-neutral-800 max-w-2xl rounded-3xl border-2 border-neutral-700 p-7">
                  <div className="flex gap-5 pb-3">
                    
                    <textarea placeholder="Add a Task"
                      className="rounded-2xl font-semibold border-2 bg-transparent  px-3 py-4 w-5/6 focus:outline-none focus:ring focus:ring-amber-400 focus:border-neutral-500 duration-300"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={addIsPosting}>
                    </textarea>
                    
                    <button 
                      className="rounded-xl font-semibold border-2 border-amber-400 w-1/6 px-3 py-4 hover:border-neutral-600 hover:bg-amber-400 hover:text-neutral-900 hover:shadow-md hover:shadow-black active:opacity-70 duration-300"
                      onClick={() => addMutate({content: input})}
                    >Add</button>
                  </div>
                  <div className="relative overflow-auto pt-2 h-9/10 border-y-2 border-amber-400 ">
                    {proc.data.map((item) => (
                      <div key={item.id} className="group">
                        <div className="relative w-98% font-semibold border-b-2 bg-transparent px-3 py-4 hover:bg-neutral-700 duration-300 flex items-start">

                          <div className=" w-2/12 items-center place-content-center">
                            <button className=" w-1/2 opacity-0 group-hover:opacity-100 hover:brightness-50 duration-300">
                              <DragHandleHorizontalIcon className="h-6 w-6 rounded duration-300"/>
                            </button>
                            <button className=" w-1/2 hover:brightness-75 active:brightness-50 duration-300 ">
                              <CircleIcon className="h-6 w-6 rounded duration-300"/>
                            </button>
                          </div>
                          
                          
                          <div className=" w-6/12 items-center">
                            <p className="text-ellipsis overflow-hidden">{item.content}</p>
                          </div>
                          <div className="w-3/12 items-center place-content-center">
                            13/04/23 12:00
                          </div>

                          <button className="relative w-1/12">

                            <DropdownMenu.Root>
                              <DropdownMenu.Trigger disabled={deleteIsPosting} className="pr-1 opacity-0 group-hover:opacity-100 hover:brightness-50 duration-300 rounded focus:outline-none">
                                <DotsVerticalIcon className="h-6 w-6"/>
                              </DropdownMenu.Trigger>

                              <DropdownMenu.Content sideOffset={5} className=" relative z-50 px-2 py-1 bg-neutral-800 border-2 rounded shadow-md shadow-black">
                                <DropdownMenu.DropdownMenuItem className="px-2 hover:cursor-pointer focus:bg-amber-400 focus:text-black focus:outline-none rounded duration-300"
                                  onClick={handleOpen}>
                                    Edit
                                </DropdownMenu.DropdownMenuItem>
                                <DropdownMenu.DropdownMenuSeparator className="h-0.5 bg-slate-200 mx-0.5 my-1"/>
                                <DropdownMenu.DropdownMenuItem className="px-2 text-red-500 hover:cursor-pointer focus:bg-amber-400 focus:text-red-500 focus:outline-none rounded duration-300" 
                                  onClick={()=>deleteMutate({itemId: item.id})}>
                                    Delete
                                </DropdownMenu.DropdownMenuItem>
                              </DropdownMenu.Content>
                            </DropdownMenu.Root>

                          </button>
                        </div>

                        <Dialog size="md" open={editIsOpen} handler={handleOpen} className="flex h-screen w-screen place-content-center items-center bg-neutral-950 bg-opacity-50">
                         
                            <div className="absolute h-2/3 w-1/3 rounded-2xl p-5 bg-neutral-800 ring-4 ring-amber-400 shadow-xl shadow-neutral-950">
                              <DialogHeader> <span className="text-3xl font-extrabold">Edit item</span> </DialogHeader>
                              <DialogBody divider>
                                
                                <div className="w-full">
                                  <span className="">Description</span>
                                  <textarea defaultValue="Stuff" name="description" className="flex py-1 px-3 bg-neutral-900 w-full h-56"/>
                                </div>
                                
                                <div className="bg-green-600 w-full">bye</div>
                              </DialogBody>
                              <DialogFooter className="place-content-end gap-4">
                                <button>
                                  onClick={() => handleOpen()}
                                  className="shadow-black text-red-600 border-4 border-red-600 hover:bg-slate-200 h-12 w-24 rounded-xl shadow hover:shadow-lg hover:shadow-black duration-300 font-bold active:opacity-70 ">
                                  <span>Cancel</span>
                                </button>

                                <button
                                  onClick={() => handleOpen()}
                                  className="shadow-black text-slate-200 h-12 w-24 rounded-xl font-bold bg-green-600 shadow hover:shadow-lg hover:shadow-black active:opacity-70 duration-300">
                                  <span>Confirm</span>
                                </button>
                              </DialogFooter>
                            </div>
                          
                          
                        </Dialog>
                        
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
      </Fragment>
    )
  };