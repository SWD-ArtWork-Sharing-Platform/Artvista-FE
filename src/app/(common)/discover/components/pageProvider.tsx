"use client";
import { AppProvider } from "@/contexts/AppContext";
import Discover from "./Discover";
import ShopLayout from "@/components/Shop/ShopLayout";
import AOSWrapper from "@/components/AOSWrapper/AOSWrapper";

const DiscoverProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AOSWrapper>
          <ShopLayout>
            <section>
              <Discover numberOfItems={undefined} />
            </section>
          </ShopLayout>
        </AOSWrapper>
      </AppProvider>
    </>
  );
};

export default DiscoverProvider;
