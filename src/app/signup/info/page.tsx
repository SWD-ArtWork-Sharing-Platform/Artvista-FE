import { Metadata } from "next";
import SignUpAuth from "./SignUpAuth";

export const metadata: Metadata = {
  title: "Artvista",
  description: "This is Sign Up Page for Artvista",
};

export default function SignupInfoPage() {
  return (
    <>
      <SignUpAuth />
    </>
  );
}
