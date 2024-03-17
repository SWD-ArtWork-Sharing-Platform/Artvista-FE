"use client";
import { AppProvider } from "@/contexts/AppContext";
import ShopLayout from "@/components/Shop/ShopLayout";
import AOSWrapper from "@/components/AOSWrapper/AOSWrapper";
import TrendingProduct from "@/components/Shop/TrendingProduct";
import TopCreator from "@/components/Shop/TopCreator";
import HomeCategories from "@/components/Shop/HomeCategories";
import Carousel from "@/components/Shop/Carousel";

const HomePageProvider = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AOSWrapper>
          <ShopLayout>
            <Carousel />
            <TrendingProduct />
            <TopCreator />
            <HomeCategories />
          </ShopLayout>
        </AOSWrapper>
      </AppProvider>
    </>
  );
};

export default HomePageProvider;
