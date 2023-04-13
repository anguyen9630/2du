import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Logo from "/public/2du_logo.svg"


export const HeaderContent = () => {  
  
    return (
      <header className="static inline-flex w-full p-6 bg-neutral-950 shadow-md shadow-neutral-950">
        <nav className="w-1/2">
          <div className="w-fit">
            <Link href = "/" title="Home">
              <Logo className="h-14 w-14 invert"/>
            </Link>
          </div>
        </nav>
  
        <SignedIn>
          <nav className="relative w-1/2 items-center " >
            <div className="absolute right-0" >
              <UserButton appearance={{
                    elements:{
                      userButtonAvatarBox : "h-14 w-14",
                    }
                  }
                } />
            </div>
          </nav>
        </SignedIn>
        
        <SignedOut>
          <nav className="w-1/2 relative p-5" >
            <SignInButton mode="modal">
              <button className="absolute right-2 top-1.5 px-4 py-2 rounded-xl font-semibold border-2 border-amber-400 hover:border-neutral-700 hover:bg-amber-400 hover:text-black active:opacity-70 duration-300">
                Sign In!
              </button>
            </SignInButton>

            
          </nav>
        </SignedOut>
      </header>
      
    );
  };