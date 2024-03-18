"use client";

import authApi from "@/api/auth/auth";
import Loading from "@/components/Loading/Loading";
import useAppContext from "@/hooks/useAppContext";
import useAuth from "@/hooks/useAuth";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const ConfirmEmail: NextPage = () => {
  const params = useParams();
  const email = params.email as string;
  const code = params.code as string;
  const { isLoading, enableLoading, disableLoading } = useAppContext();
  const { loginWithEmail } = useAuth();

  useEffect(() => {
    enableLoading();
    authApi
      .ConfirmEmail(email, code)
      .then((response) => {
        if (response.data.isSuccess) {
          loginWithEmail(email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section className="w-screnn h-screen">
        <Loading loading={isLoading} />
      </section>
    </>
  );
};
export default ConfirmEmail;
