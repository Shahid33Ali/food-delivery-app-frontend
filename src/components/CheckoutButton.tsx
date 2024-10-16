import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useGetMyUser } from "@/api/MyUserApi";
import UserProfileForm, {
  UserFormData,
} from "@/forms/update-profile-form/UserProfileForm";
type Props = {
  onCheckout: (userformdata: UserFormData) => void;
};
const CheckoutButton = ({ onCheckout }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();
  const { currentUser, isLoading: isGetMyLoading } = useGetMyUser();
  const onLogIn = () => {
    loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };
  if (!isAuthenticated) {
    return (
      <Button onClick={onLogIn} className="bg-orange-500 flex-1">
        Log Iin to CheckOut
      </Button>
    );
  }
  if (isAuthLoading || !currentUser) {
    return <LoadingButton />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 flex-1">Go To Checkout</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetMyLoading}
          title="Checkout Details Page"
          buttontext="Continue to Payemnt"
        />
      </DialogContent>
    </Dialog>
  );
};
export default CheckoutButton;
