import Image from "next/image";
import { auth, signOut, signIn } from "@/auth"

const NavBar = async () => {
  const session = await auth(); //email, img, name

  return (
    <div className="h-[5vh] flex justify-between items-center bg-black text-white text-lg pl-5 pr-5">
      <div className="flex w-[45vh]">
        <Image className="invert mr-7" src="/next.svg" width="100" height="100" alt="logo"/>
        <button className="mr-7">Deck Build</button>
        <button className="mr-7">Cards</button>
        <button>Simulation</button>
      </div>
      <div className="flex justify-end w-[25vh] text-lg">
        <button className="mr-7">Dark/Light</button>
        {!session ? 
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <button type="submit">Log in</button>
          </form>
          :
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {session.user?.image && <Image src={session.user.image} width="34" height="34" alt="google img" className="rounded-2xl mr-3"/>}
              <form
                action={async () => {
                  "use server"
                  await signOut()
                }}
              >
                <button type="submit">Log out</button>
              </form>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default NavBar;