"use client";
import { PATH_AUTH } from "@/routes/paths";
import { Role, RoleString } from "@/utils/accountRole";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";

const CreatorPage: NextPage = () => {
  const router = useRouter();
  const sortedPriceOptions = [
    { value: "all", name: "Price: All" },
    { value: "lowtohigh", name: "Price: Low to high" },
    { value: "hightolow", name: "Price: High to low" },
  ];

  return (
    <div className="flex-1 flex flex-col items-end justify-start gap-[5.438rem_0rem] max-w-full text-left text-[1.5rem] text-bg font-barlow mq800:gap-[2.688rem_0rem] mq450:gap-[1.375rem_0rem]">
      <div className="self-stretch flex flex-col items-end justify-start gap-[0.625rem_0rem] max-w-full">
        <div className="w-[85rem] flex flex-row items-start justify-between max-w-full gap-[1.25rem] mq1350:flex-wrap">
          <div className="w-[15.188rem] flex flex-col items-start justify-start pt-[0.8rem] px-[0rem] pb-[0rem] box-border">
            <div className="self-stretch flex flex-col items-end justify-start gap-[0.938rem_0rem]">
              <div className="self-stretch flex flex-col items-center justify-start">
                <img
                  className="w-[8rem] h-[8rem] rounded-[50%] object-cover z-[1]"
                  loading="lazy"
                  alt=""
                  src="/images/shop/CreatorVistPage/ellipse-546@2x.png"
                />
                <div className="flex flex-col items-center justify-start py-[0rem] px-[1.25rem] gap-[0.813rem_0rem]">
                  <div className="mt-3 relative leading-[1.5rem] font-semibold mq450:text-[1.188rem] mq450:leading-[1.188rem]">
                    John Doe
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-row items-start justify-start py-[0rem] px-[1.688rem]">
                <button className="cursor-pointer [border:none] py-[0.688rem] pr-[3.25rem] pl-[3.188rem] bg-primary-colour rounded-10xs overflow-hidden flex flex-row items-start justify-start gap-[0rem_0.938rem]">
                  <div className="flex flex-col items-start justify-start pt-[0.063rem] px-[0rem] pb-[0rem]">
                    <img
                      className="w-[1.5rem] h-[1.5rem] relative overflow-hidden shrink-0"
                      alt=""
                      src="/images/shop/CreatorVistPage/mingcuteuserfollowline.svg"
                    />
                  </div>
                  <div className="relative text-[1rem] leading-[160.5%] font-medium font-barlow text-neutral-white text-left">
                    Follow
                  </div>
                </button>
              </div> */}
              <div className="text-[1.rem] self-stretch flex flex-col items-start justify-center py-[0rem] pl-[0rem] gap-[1rem_0rem]">
                <img
                  className="self-stretch h-[0.063rem] relative max-w-full overflow-hidden shrink-0 mix-blend-normal"
                  loading="lazy"
                  alt=""
                  src="/images/shop/CreatorVistPage/divider.svg"
                />
                <div className="text-[1.5rem] self-stretch flex flex-row items-center justify-between gap-[1.25rem] mq450:flex-wrap">
                  <div className="w-[3.688rem] flex flex-col items-start justify-center gap-[0rem_0rem]">
                    <div className="text-center w-full">46</div>
                    <div className="self-stretch relative text-[0.875rem] leading-[1.313rem] font-medium">
                      Followers
                    </div>
                  </div>
                  <div className="w-[3.688rem] flex flex-col items-start justify-center gap-[0rem_0rem]">
                    <div className="text-center w-full"> 27</div>
                    <div className="self-stretch relative text-[0.875rem] leading-[1.313rem] font-medium">
                      Following
                    </div>
                  </div>
                  <div className="w-[2.188rem] flex flex-col items-start justify-center gap-[0rem_0rem]">
                    <div className="text-center w-full"> 142</div>
                    <div className="self-stretch relative text-[0.875rem] leading-[1.313rem] font-medium">
                      Items
                    </div>
                  </div>
                </div>
                <img
                  className="self-stretch h-[0.063rem] relative max-w-full overflow-hidden shrink-0 mix-blend-normal"
                  alt=""
                  src="/images/shop/CreatorVistPage/divider.svg"
                />
              </div>
            </div>
          </div>
          <div className="w-[64.25rem] rounded-6xl overflow-hidden shrink-0 flex flex-col items-start justify-start py-[2.688rem] px-[2.75rem] box-border gap-[2.5rem_0rem] bg-[url('/images/shop/CreatorVistPage/arrowleft-frame@3x.png')] bg-cover bg-no-repeat bg-[top] max-w-full text-[1.625rem] text-neutral-white mq800:gap-[1.25rem_0rem] mq800:pl-[1.375rem] mq800:pr-[1.375rem] mq800:box-border">
            <h3 className="m-0 relative text-inherit leading-[160.5%] font-medium font-inherit inline-block max-w-full mq450:text-[1.313rem] mq450:leading-[2.063rem]">
              <p className="m-0">Showcase and sell your art in the most</p>
              <p className="m-0">awesome digital art marketplace</p>
            </h3>
            <div className="flex flex-row items-start justify-start gap-[0rem_1.188rem] text-primary-colour">
              <h3
                className="cursor-pointer m-0 relative text-inherit leading-[144.5%] font-normal font-inherit mq450:text-[1.313rem] mq450:leading-[1.875rem]"
                onClick={() => {
                  localStorage.setItem("signuprole", RoleString.CREATOR);
                  router.push(PATH_AUTH.signupInfo);
                }}
              >
                Become a seller
              </h3>
              <div className="flex flex-col items-start justify-start pt-[0.438rem] px-[0rem] pb-[0rem]">
                <img
                  className="w-[1.5rem] h-[1.5rem] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/images/shop/CreatorVistPage/arrowright.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start max-w-full text-center text-[1.25rem]">
          {/* <div className="ps-24 mt-5 w-[22.375rem] flex flex-col items-start justify-start gap-[1.875rem_0rem] max-w-full"> */}
          {/* <div className="self-stretch flex flex-col items-start justify-center py-[0rem] pr-[5rem] pl-[0rem] gap-[1rem_0rem]">
              <img
                className="self-stretch h-[0.063rem] relative max-w-full overflow-hidden shrink-0 mix-blend-normal"
                loading="lazy"
                alt=""
                src="/images/shop/CreatorVistPage/divider.svg"
              />
              <div className="self-stretch flex flex-row items-center justify-between gap-[1.25rem] mq450:flex-wrap">
                <div className="w-[3.688rem] flex flex-col items-start justify-center gap-[0.375rem_0rem]">
                  <div className="text-center w-full">46</div>
                  <div className="self-stretch relative text-[0.875rem] leading-[1.313rem] font-medium">
                    Followers
                  </div>
                </div>
                <div className="w-[3.688rem] flex flex-col items-start justify-center gap-[0.375rem_0rem]">
                  <div className="text-center w-full"> 27</div>
                  <div className="self-stretch relative text-[0.875rem] leading-[1.313rem] font-medium">
                    Following
                  </div>
                </div>
                <div className="w-[2.188rem] flex flex-col items-start justify-center gap-[0.375rem_0rem]">
                  <div className="text-center w-full"> 142</div>
                  <div className="self-stretch relative text-[0.875rem] leading-[1.313rem] font-medium">
                    Items
                  </div>
                </div>
              </div>
              <img
                className="self-stretch h-[0.063rem] relative max-w-full overflow-hidden shrink-0 mix-blend-normal"
                alt=""
                src="/images/shop/CreatorVistPage/divider.svg"
              />
            </div> */}
          {/* <button className="cursor-pointer py-[0.656rem] px-[2.125rem] bg-[transparent] w-[20.625rem] h-[2.938rem] rounded-10xs box-border overflow-hidden shrink-0 flex flex-col items-center justify-center max-w-full border-[1px] border-solid border-primary-colour">
              <div className="flex flex-row items-center justify-center gap-[0rem_0.75rem]">
                <img
                  className="h-[1.688rem] w-[1.688rem] relative overflow-hidden shrink-0"
                  alt=""
                  src="/images/shop/CreatorVistPage/materialsymbolsupload.svg"
                />
                <div className="relative text-[1.125rem] leading-[160.5%] font-medium font-barlow text-primary-colour text-left">
                  Upload Product
                </div>
              </div>
            </button> */}
          {/* </div> */}
          <div className="flex-1 flex flex-col items-start justify-start pt-[1.375rem] px-[0rem] pb-[0rem] box-border min-w-[41.75rem] max-w-full text-left text-[1.069rem] mq800:min-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[2.813rem_0rem] max-w-full mq800:gap-[1.375rem_0rem]">
              <div className="self-stretch flex flex-row items-start justify-start gap-[0rem_0.875rem] max-w-full mq1150:flex-wrap">
                <div className="rounded-10xs border-gray-600 box-border flex min-w-[10.5rem] max-w-full flex-1 flex-row items-start justify-start gap-[0rem_1.563rem] overflow-hidden border-[1px] border-solid px-[1.188rem] py-[0.4rem]">
                  <img
                    className="relative h-[1.5rem] min-h-[1.5rem] w-[1.5rem] shrink-0 cursor-pointer overflow-hidden"
                    alt=""
                    src="/images/shop/DiscoverPage/search.svg"
                    onClick={() => {
                      // setPerformSearchKey(true);
                      // handleSearch();
                    }}
                  />
                  <input
                    className="font-barlow text-gray-500 box-border flex h-[1.344rem] w-full flex-col items-start justify-start bg-[transparent] px-[0rem] pb-[0rem] pt-[0.156rem] text-[1rem] leading-[160.5%] text-neutral-white [border:none] [outline:none]"
                    placeholder="Search by artwork name"
                    type="text"
                    // value={searchKey}
                    onChange={(e) => {
                      // setPerformSearchKey(false);
                      // handleChangeSearchKey(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        // setPerformSearchKey(true);
                        // handleSearch();
                      }
                    }}
                  />
                </div>

                <div>
                  <div className="rounded-10xs border-gray-600 relative flex min-w-[8rem] cursor-pointer flex-row items-start justify-center gap-[0rem_0.625rem] overflow-hidden border-[1px] border-solid bg-[transparent] px-[1rem] py-[0.469rem] text-[1rem]">
                    <select
                      // value={sortedPrice}
                      className="relative cursor-pointer overflow-hidden border-0 bg-[transparent] text-[1rem]"
                      onChange={(e) => {
                        // setSortedPrice(e.target.value);
                      }}
                    >
                      {sortedPriceOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className="cursor-pointer [border:none] py-[0.4rem] px-[1.5rem] bg-primary-colour rounded-10xs overflow-hidden flex flex-row items-start justify-start gap-[0rem_0.5rem]">
                  <div className="flex flex-col items-start justify-start pt-[0.063rem] px-[0rem] pb-[0rem]">
                    <img
                      className="w-[1.5rem] h-[1.5rem] relative overflow-hidden shrink-0"
                      alt=""
                      src="/images/shop/CreatorVistPage/uilmessage.svg"
                    />
                  </div>
                  <div className="relative text-[1rem] leading-[160.5%] font-medium font-barlow text-neutral-white text-left">
                    Message
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 self-stretch flex flex-row flex-wrap items-start justify-center gap-[1rem_1.45rem] min-h-[83.688rem] max-w-full">
            {/*card here */}
          </div>
        </div>
      </div>
      <div className="w-full py-[0rem] px-[11.25rem] flex justify-center box-border max-w-full">
        <button className="cursor-pointer py-[0.656rem] px-[2.625rem] bg-[transparent] rounded-10xs overflow-hidden border-[1px] border-solid border-primary-colour hover:bg-blueviolet-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-blueviolet-100">
          <div className="relative text-[1rem] leading-[160.5%] font-medium font-barlow text-primary-colour text-left">
            Load more
          </div>
        </button>
      </div>
    </div>
  );
};

export default CreatorPage;
