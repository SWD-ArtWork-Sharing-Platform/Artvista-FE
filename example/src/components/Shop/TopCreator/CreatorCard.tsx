import type { NextPage } from "next";

export type CreatorCardType = {
  asset122?: string;
  keepitreal?: string;
  cTAs?: string;
};

const CreatorCard: NextPage<CreatorCardType> = ({
  asset122,
  keepitreal,
  cTAs,
}) => {
  return (
    <div className="bg-darkslategray text-7xl-8 text-neutral-white font-barlow relative box-border flex w-[292px] shrink-0 flex-col items-center justify-start gap-[24.41px_0px] rounded-[24.41px] p-[24.408967971801758px] text-center">
      <div className="flex flex-col items-end justify-start">
        <div className="flex flex-row items-start justify-start">
          <img
            className="relative h-[146.5px] w-[146.5px] object-cover"
            loading="lazy"
            alt=""
            src={asset122}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[6.1px_0px] self-stretch">
        <div className="mq450:text-2xl mq450:leading-[30px] relative self-stretch font-semibold capitalize leading-[140%]">
          {keepitreal}
        </div>
        <div className="text-lgi-5 text-caption-label-text flex flex-row items-start justify-center gap-[0px_12.2px] self-stretch text-right">
          <div className="relative flex-1 leading-[140%]">Total Sales:</div>
          <div className="text-neutral-white relative flex-1 text-left leading-[140%]">
            34.5K USD
          </div>
        </div>
      </div>
      <div className="bg-background text-lgi-5 text-caption-label-text font-space-mono absolute left-[24.4px] top-[22px] !m-[0] flex h-[37px] w-[36.6px] flex-row items-start justify-start rounded-[24.41px]">
        <div className="absolute left-[calc(50%_-_6.1px)] top-[calc(50%_-_13.7px)] !m-[0] leading-[140%]">
          {cTAs}
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
