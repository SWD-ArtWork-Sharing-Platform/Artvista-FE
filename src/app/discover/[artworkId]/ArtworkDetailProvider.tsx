"use client";
import AOSWrapper from "@/components/AOSWrapper/AOSWrapper";
import { AppProvider } from "@/contexts/AppContext";
import ArtworkDetail from "./ArtworkDetail";
import ShopLayout from "@/components/ShopLayout/ShopLayout";
import { AuthProvider } from "@/contexts/JWTContext";

const ArtworkDetailProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <AOSWrapper>
            <ShopLayout>
              <section>
                <ArtworkDetail />
              </section>
            </ShopLayout>
          </AOSWrapper>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default ArtworkDetailProvider;
