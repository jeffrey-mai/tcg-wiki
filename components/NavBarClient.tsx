"use client";

import Image from "next/image";
import { signOut, signIn } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation";
import { Session } from "next-auth";

const NavBarClient = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-[5vh] w-[150vh] flex justify-between items-center text-white pl-5 pr-5">
      <Image
        className="invert cursor-pointer border-2 border-transparent hover:border-black rounded-xl px-[5px] py-[8px] transition-colors duration-300"
        onClick={() => pathname !== "/" ? router.push("/") : window.location.reload()} 
        src="/next.svg" 
        width="100" 
        height="100" 
        alt="logo"
      />
      <div className="flex w-[auto] text-neutral-300">
        <button className="NavBarButton mr-1" onClick={() => pathname !== "/deck-build" ? router.push("/deck-build") : window.location.reload()}>Decks</button>
        <button className="NavBarButton mr-1" onClick={() => pathname !== "/cards" ? router.push("/cards") : window.location.reload()}>Cards</button>
        <button className="NavBarButton">Simulation</button>
      </div>
      <div className="flex justify-end w-auto">
        <button className="NavBarButton mr-3 text-neutral-300">Dark/Light</button>
        {!session ? 
          <button
            className="bg-white text-black hover:invert border-2 border-black cursor-pointer rounded-xl px-[8px] py-[4px] transition-colors ease-in-out"
            type="submit"
            onClick={() => signIn("google")}
          >
            Log in
          </button>
          :
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {session.user?.image && <Image src={session.user.image} width="34" height="34" alt="google img" className="rounded-2xl mr-3"/>}
              <button 
              className="bg-white text-black hover:invert border-2 border-black cursor-pointer rounded-xl px-[8px] py-[4px] transition-colors ease-in-out" 
              type="submit"
              onClick={() => signOut()}
              >
                Log out
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default NavBarClient;