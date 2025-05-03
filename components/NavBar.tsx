import { auth } from "@/auth"
import NavBarClient from "./NavBarClient";

const NavBar = async () => {
  const session = await auth(); //email, img, name
  return <NavBarClient session={session}/>
}

export default NavBar;