import Link from "next/link";
import CategoryCard from "./CategoryCard";

const HomeCategories = (props: {}) => {
  return (
    <section className="text-19xl text-neutral-white font-barlow mq450:gap-[72px_0px] mq750:gap-[72px_0px] mq750:pb-[20px] mq750:box-border mq1100:pb-[20px] mq1100:box-border box-border flex w-[1327px] max-w-full flex-col items-start justify-start gap-[72px_0px] px-5 pb-[20px] pt-0 text-left">
      <h1 className="font-inherit mq450:text-4xl mq450:leading-[27px] mq750:text-11xl mq750:leading-[36px] relative m-0 inline-block w-[1050px] max-w-full font-semibold capitalize leading-[120%] text-inherit">
        Categories
      </h1>
      <div className="mq750:gap-[37px_32.15px] flex min-h-[811px] flex-row flex-wrap items-start justify-center gap-[37px_32.15px] self-stretch text-8xl">
        <CategoryCard
          imagePlaceholder="/images/shop/HomePage/Categories/image-placeholder@2x.png"
          image="/images/shop/HomePage/Categories/paintbrush.svg"
          categoryName="Digital Art"
        />
        <CategoryCard
          imagePlaceholder="/images/shop/HomePage/Categories/image-placeholder-1@2x.png"
          image="/images/shop/HomePage/Categories/swatches.svg"
          categoryName="Game assets"
        />

        <CategoryCard
          imagePlaceholder="/images/shop/HomePage/Categories/image-placeholder-2@2x.png"
          image="/images/shop/HomePage/Categories/musicnotes.svg"
          categoryName="Audio"
        />

        <CategoryCard
          imagePlaceholder="/images/shop/HomePage/Categories/image-placeholder-3@2x.png"
          image="/images/shop/HomePage/Categories/camera.svg"
          categoryName="Photography"
        />

        <CategoryCard
          imagePlaceholder="/images/shop/HomePage/Categories/image-placeholder-6@2x.png"
          image="/images/shop/HomePage/Categories/basketball.svg"
          categoryName="Game art"
        />

        <CategoryCard
          imagePlaceholder="/images/shop/HomePage/Categories/image-placeholder-7@2x.png"
          image="/images/shop/HomePage/Categories/planet.svg"
          categoryName="Illustration"
        />
        <CategoryCard
          image="/images/shop/HomePage/Categories/videocamera.svg"
          imagePlaceholder="/images/shop/HomePage/Categories/image-placeholder-4@2x.png"
          categoryName="Animation"
        />
        <CategoryCard
          image="/images/shop/HomePage/Categories/magicwand.svg"
          imagePlaceholder="/images/shop/HomePage/Categories/image-placeholder-5@2x.png"
          categoryName="Modeling"
        />
      </div>
    </section>
  );
};

export default HomeCategories;
