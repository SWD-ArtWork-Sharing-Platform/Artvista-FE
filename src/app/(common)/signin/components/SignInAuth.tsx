"use client";
import { AuthProvider } from "@/contexts/JWTContext";
import SignIn from "./SignIn";
import { AppProvider } from "@/contexts/AppContext";

const SignInAuth = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default SignInAuth;
