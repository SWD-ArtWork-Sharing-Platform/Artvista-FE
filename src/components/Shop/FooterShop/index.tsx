import Link from "next/link";
import Image from "next/image";

const FooterShop = (props: {}) => {
  return (
    <footer className="text-13xl text-input-field-text font-barlow mq750:gap-[52px_0px] mq750:pt-[42px] mq750:pb-[47px] mq750:box-border mq1250:pl-[34px] mq1250:box-border relative box-border flex max-w-full flex-col items-center justify-start gap-[52px_0px] self-stretch overflow-hidden pb-[50px] pl-[68px] pr-5 pt-16 text-left">
      <img
        className="absolute right-[-311.5px] top-[-312px] !m-[0] h-[875.2px] w-[667.5px] object-contain"
        loading="lazy"
        alt=""
        src="/images/shop/HomePage/Footer/group-34356@2x.png"
      />
      <div className="box-border flex w-[1308px] max-w-full flex-row items-start justify-start pb-[22px] pl-0 pr-[29px] pt-0">
        <div className="mq450:gap-[0px_70px] mq750:gap-[0px_70px] mq1250:flex-wrap flex max-w-full flex-1 flex-row items-center justify-start gap-[0px_70px]">
          <div className="mq450:gap-[34px_0px] mq750:min-w-full mq1250:flex-1 flex min-w-[393px] max-w-full flex-col items-start justify-start gap-[34px_0px]">
            <div className="text-neutral-white flex flex-row items-center justify-center">
              <h2 className="font-inherit mq450:text-lgi mq750:text-7xl relative m-0 font-semibold text-inherit">
                Artvista
              </h2>
            </div>
            <div className="relative inline-block w-[393px] text-base leading-[24px]">
              Enter your email to get notified by Artvista for latest updates.
            </div>
            <div className="flex flex-row items-center justify-center gap-[0px_20px]">
              <img
                className="relative h-5 min-h-[20px] w-5"
                alt=""
                src="/images/shop/HomePage/Footer/vector-6.svg"
              />
              <img
                className="relative h-5 min-h-[20px] w-5"
                alt=""
                src="/images/shop/HomePage/Footer/vector-7.svg"
              />
              <img
                className="relative h-5 min-h-[20px] w-5"
                alt=""
                src="/images/shop/HomePage/Footer/vector-8.svg"
              />
            </div>
            <div className="rounded-11xl bg-card-bg border-dimgray-200 box-border flex w-[347px] max-w-full flex-col items-end justify-start border-[1px] border-solid py-[15px] pl-[21px] pr-[19px] text-sm">
              <div className="flex flex-row items-center justify-between gap-[20px] self-stretch rounded-full">
                <input
                  className="relative inline-block w-[260px] shrink-0 border-0 bg-transparent
                font-medium	leading-[21px]"
                  placeholder="Email Address"
                />
                {/* Email Address
                </input> */}
                <div className="flex flex-row items-start justify-start [transform:_rotate(180deg)]">
                  <img
                    className="relative h-7 w-7 [transform:_rotate(-180deg)]"
                    alt=""
                    src="/images/shop/HomePage/Footer/vuesaxlineararrowleft.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-neutral-white mq750:flex-wrap mq750:min-w-full z-[1] flex min-w-[530px] max-w-full flex-1 flex-row items-start justify-between gap-[20px] text-xl">
            <div className="flex flex-col items-start justify-start gap-[22px_0px]">
              <div className="mq450:text-base mq450:leading-[22px] relative font-semibold leading-[27px]">
                Artvista
              </div>
              <div className="text-input-field-text flex flex-col items-start justify-start gap-[15px_0px] text-lg">
                <div className="relative leading-[24px]">Explore</div>
                <div className="relative leading-[24px]">Digital Art</div>
                <div className="relative leading-[24px]">About</div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[22px_0px]">
              <div className="mq450:text-base mq450:leading-[22px] relative font-semibold leading-[27px]">
                My Account
              </div>
              <div className="text-input-field-text flex flex-col items-start justify-start gap-[15px_0px] text-lg">
                <div className="relative leading-[24px]">Profile</div>
                <div className="relative leading-[24px]">Favourites</div>
                <div className="relative leading-[24px]">Watchlist</div>
                <div className="relative leading-[24px]">My Collections</div>
                <div className="relative leading-[24px]">Settings</div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[22px_0px] text-lg">
              <div className="relative font-semibold leading-[27px]">
                Resources
              </div>
              <div className="text-input-field-text flex flex-col items-start justify-start gap-[15px_0px]">
                <div className="relative leading-[24px]">Platform Status</div>
                <div className="relative leading-[24px]">Partners</div>
                <div className="relative leading-[24px]">Taxes</div>
                <div className="relative leading-[24px]">Newsletter</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="border-grey text-neutral-white font-para2-semi-14 relative box-border
      items-start justify-start self-stretch border-t-[1px] border-solid py-0 pl-0 text-center text-sm opacity-[0.3]"
      >
        <div className="relative pt-5 font-semibold leading-[21px]">
          © Artvista @ All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default FooterShop;
