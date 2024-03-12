import { Metadata } from "next";
import SignInAuth from "./SignInAuth";

export const metadata: Metadata = {
  title: "Artvista",
  description: "This is Sign In Page for Artvista",
};

export default function SignupInfo() {
  return (
    <>
      <SignInAuth />
    </>
  );
}
