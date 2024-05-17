import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SignInForm from "@/components/SignInForm";
import useAuthStore from "@/hooks/useAuthStore";
import ProfileComponent from "@/components/ProfileComponent";

export type UserProfile = {
  name: string;
  address: string;
};


const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token, removeToken, loadToken } = useAuthStore();

  useEffect(() => {
    loadToken();
    setIsLoading(false);
  }, []);

  if (!token) {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
    return <SignInForm />;
  }

  return (
    <>
      <ProfileComponent token={token} removeToken={removeToken} />
    </>
  );
};

export default Profile;
