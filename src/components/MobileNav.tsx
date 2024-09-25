import { CircleUserIcon, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>
          {!isAuthenticated ? (
            " Welocme to Mern Eats"
          ) : (
            <span className="flex items-center font-bold gap-2 hover:text-orange-500">
              <CircleUserIcon className="" />
              <span className="">{user?.email}</span>
            </span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription>
          {!isAuthenticated ? (
            <div className="flex justify-center">
              <Button
                className="flex-1 font-bold bg-orange-500 my-4"
                onClick={async () => await loginWithRedirect()}
              >
                Log In
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-center px-16 my-4">
                <Button
                  className="flex flex-1 font-bold bg-orange-500"
                  onClick={() => logout()}
                >
                  Log Out
                </Button>
              </div>
              <Separator />
              <div className="flex justify-center  px-26 my-4 text-white">
                <Link
                  to="/user-profile"
                  className="font-bold bg-orange-500 px-16 py-2"
                >
                  User profile
                </Link>
              </div>
            </>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
