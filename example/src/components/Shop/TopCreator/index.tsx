import Link from "next/link";
import CreatorCard from "./CreatorCard";

const TopCreator = (props: {}) => {
  return (
    <section className="text-19xl text-neutral-white font-barlow mq450:gap-[72px_0px] mq450:pb-[58px] mq450:box-border mq750:gap-[72px_0px] mq1100:pb-[90px] mq1100:box-border box-border flex max-w-full flex-col items-start justify-start gap-[72px_0px] pb-[138px] pl-5 pr-[21px] pt-0 text-left">
      <div className="box-border flex max-w-full shrink-0 flex-row items-start justify-start px-[5px] py-0">
        <div className="mq450:gap-[0px_324px] mq750:gap-[0px_324px] mq1250:flex-wrap mq1250:gap-[0px_324px] flex w-[1050px] max-w-full flex-row items-end justify-start gap-[0px_324px]">
          <div className="flex w-[703px] max-w-full flex-col items-start justify-start gap-[10px_0px]">
            <div className="flex max-w-full flex-row items-start justify-start self-stretch">
              <h1 className="font-inherit mq450:text-4xl mq450:leading-[27px] mq750:text-11xl mq750:leading-[36px] relative m-0 inline-block max-w-full flex-1 font-semibold capitalize leading-[120%] text-inherit">
                Top creators
              </h1>
            </div>
            <div className="flex max-w-full flex-row items-start justify-start self-stretch text-3xl">
              <div className="mq450:text-lg mq450:leading-[28px] relative inline-block max-w-full flex-1 capitalize leading-[160%]">
                Checkout Top Rated Creators
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-7xl-8 mq750:gap-[38px_33.03px] flex h-[620px] w-[1281px] max-w-full shrink-0 flex-row flex-wrap items-start justify-start gap-[38px_33.03px] overflow-x-auto text-center">
        <CreatorCard
          asset122="/images/shop/HomePage/TopCreator/asset-12-2@2x.png"
          keepitreal="Keepitreal"
          cTAs="1"
        />
        <CreatorCard
          asset122="/images/shop/HomePage/TopCreator/asset-12-2-1@2x.png"
          keepitreal="DigiLab"
          cTAs="2"
        />
        <CreatorCard
          asset122="/images/shop/HomePage/TopCreator/asset-12-2-2@2x.png"
          keepitreal="GravityOne"
          cTAs="3"
        />
        <CreatorCard
          asset122="/images/shop/HomePage/TopCreator/asset-12-2-3@2x.png"
          keepitreal="Juanie"
          cTAs="4"
        />
        <CreatorCard
          asset122="/images/shop/HomePage/TopCreator/asset-12-2-4@2x.png"
          keepitreal="BlueWhale"
          cTAs="5"
        />
        <CreatorCard
          asset122="/images/shop/HomePage/TopCreator/asset-12-2-5@2x.png"
          keepitreal="mr fox"
          cTAs="6"
        />
        <CreatorCard
          asset122="/images/shop/HomePage/TopCreator/asset-12-2-6@2x.png"
          keepitreal="Shroomie"
          cTAs="7"
        />
        <CreatorCard
          asset122="/images/shop/HomePage/TopCreator/asset-12-2-7@2x.png"
          keepitreal="robotica"
          cTAs="8"
        />
      </div>
    </section>
  );
};

export default TopCreator;
