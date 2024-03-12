import Link from "next/link";
import TrendingProductCard from "./TrendingProductCard";

const TrendingProduct = (props: {}) => {
  return (
    <section className="text-29xl text-whte font-barlow mq450:pb-10 mq450:box-border mq750:gap-[51px_0px] mq750:pb-[61px] mq750:box-border box-border flex w-[1327px] max-w-full flex-col items-start justify-start gap-[51px_0px] px-5 pb-[94px] pt-0 text-left">
      <div className="box-border flex w-[1060px] max-w-full flex-row items-start justify-start px-[7px] py-0">
        <div className="flex max-w-full flex-1 flex-col items-start justify-start gap-[16px_0px]">
          <h1 className="font-inherit mq450:text-10xl mq750:text-19xl relative m-0 font-semibold text-inherit">
            Trending Sales
          </h1>
          <div className="mq450:text-lg mq450:leading-[28px] relative self-stretch text-3xl capitalize leading-[160%]">
            Checkout our weekly updated trending sales
          </div>
        </div>
      </div>
      <div className="text-2xl-1 mq750:gap-[0px_41px] mq750:grid-cols-[minmax(301px,_1fr)] mq1100:justify-center mq1100:grid-cols-[repeat(2,_minmax(301px,_522px))] box-border grid max-w-full grid-cols-[repeat(3,_minmax(301px,_1fr))] flex-row items-start justify-start gap-[0px_41px] self-stretch px-0 py-0">
        <TrendingProductCard
          maskGroup="/images/shop/HomePage/TrendingProduct/mask-group@2x.png"
          logoFrame="/images/shop/HomePage/TrendingProduct/ellipse-2@2x.png"
        />
        <TrendingProductCard
          maskGroup="/images/shop/HomePage/TrendingProduct/mask-group@2x.png"
          logoFrame="/images/shop/HomePage/TrendingProduct/ellipse-2@2x.png"
          propPadding="unset"
          propPadding1="unset"
        />
        <TrendingProductCard
          maskGroup="/images/shop/HomePage/TrendingProduct/mask-group@2x.png"
          logoFrame="/images/shop/HomePage/TrendingProduct/ellipse-2@2x.png"
          propPadding="0px 4px 0px 3px"
          propPadding1="unset"
        />
      </div>
    </section>
  );
};

export default TrendingProduct;
