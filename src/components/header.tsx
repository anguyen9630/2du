import Link from "next/link";
import Image from "next/image";
import { SignInButton, useUser, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";


export const HeaderContent = () => {  
  
    return (
      <header className="static inline-flex w-full p-6 bg-neutral-950 shadow-md shadow-neutral-950">
        <div className="w-1/2">
          <Link href = "/" title="Home">
            <Image src="/apple-touch-icon.png" alt="Logo" width={180} height={180} className="h-14 w-14"/>
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