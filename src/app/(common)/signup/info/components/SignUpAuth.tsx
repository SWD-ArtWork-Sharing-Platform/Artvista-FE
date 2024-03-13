"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import GuestGuard from "@/guards/GuestGuard";
import SignUpInfoScreen from "./SignUpInfoScreen";
import { AppProvider } from "@/contexts/AppContext";

const SignUpAuth = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <GuestGuard>
            <SignUpInfoScreen />
          </GuestGuard>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default SignUpAuth;
