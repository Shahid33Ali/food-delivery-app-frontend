import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/update-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading } = useUpdateMyUser();
  if (isGetLoading) {
    return <div>Loading....</div>;
  }
  if (!currentUser) {
    return <span>Unable to Load User Profile</span>;
  }
  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isLoading}
    />
  );
};
export default UserProfilePage;
