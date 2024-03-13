"use client";
import ArtworkCard from "./ArtworkCard";
import { useEffect, useState } from "react";
import { ArtworkDTO } from "@/types/market/ArtworkDTO";
import useAppContext from "@/hooks/useAppContext";
import Loading from "@/components/Loading/Loading";
import { CategoryManagementDTO } from "@/types/management/CategoryManagementDTO";
import artworkMarketApi from "@/api/market/artwork";
import categoryManagementApi from "@/api/management/category";

const Discover = (props: {}) => {
  const [artworkList, setArtworkList] = useState<ArtworkDTO[]>([]);
  const { isLoading, enableLoading, disableLoading } = useAppContext();
  const [searchKey, setSearchKey] = useState<string>("");
  const [performSearchKey, setPerformSearchKey] = useState<boolean>(false);
  const [sortedPrice, setSortedPrice] = useState<string>("all");
  const [searchCateId, setSearchCateId] = useState<string>("-1");
  const [searchCateIdOptions, setSearchCateIdOptions] = useState<
    CategoryManagementDTO[]
  >([]);
  const sortedPriceOptions = [
    { value: "all", name: "All" },
    { value: "lowtohigh", name: "Low to high" },
    { value: "hightolow", name: "High to low" },
  ];

  const renderArtwork = (
    searchkey: string = "",
    minPrice: number = 0,
    maxPrice: number = 0,
    discount: number = 0,
    status: string = "",
    cateID: string = ""
  ) => {
    enableLoading();
    artworkMarketApi
      .getAllArtworkMarketWithCondition(
        searchkey,
        minPrice,
        maxPrice,
        discount,
        status,
        cateID
      )
      .then((response) => {
        if (response.data.isSuccess && response.data.result) {
          setArtworkList(response.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        disableLoading();
      });
  };

  const renderCategory = () => {
    categoryManagementApi
      .getAllCategory()
      .then((response) => {
        if (
          response.data.isSuccess &&
          response.data.result &&
          response.data.result.isSuccess
        ) {
          setSearchCateIdOptions([
            {
              categoryId: "-1",
              categoryName: "All",
            },
            ...response.data.result.result,
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    renderArtwork();
    renderCategory();
  }, []);

  const handleChangeSearchKey = (searchKey: string) => {
    setSearchKey(searchKey);
  };

  const handleSearchByName = () => {
    renderArtwork(searchKey);
  };

  return (
    <>
      <Loading loading={isLoading} />
      <div className="text-bg font-barlow mq800:gap-[2.688rem_0rem] mq450:gap-[1.375rem_0rem] flex max-w-full flex-1 flex-col items-end justify-start gap-[5.438rem_0rem] text-left text-[1.5rem]">
        <div className="flex max-w-full flex-col items-end justify-start gap-[0.625rem_0rem] self-stretch">
          <div className="mq1150:flex-wrap flex max-w-full flex-row items-end justify-start gap-[0rem_0.875rem] self-stretch px-25">
            <div className="rounded-10xs border-gray-600 box-border flex min-w-[10.5rem] max-w-full flex-1 flex-row items-start justify-start gap-[0rem_1.563rem] overflow-hidden border-[1px] border-solid px-[1.188rem] py-[0.4rem]">
              <img
                className="relative h-[1.5rem] min-h-[1.5rem] w-[1.5rem] shrink-0 cursor-pointer overflow-hidden"
                alt=""
                src="/images/shop/DiscoverPage/search.svg"
                onClick={() => {
                  setPerformSearchKey(true);
                  handleSearchByName();
                }}
              />
              <input
                className="font-barlow text-gray-500 box-border flex h-[1.344rem] w-full flex-col items-start justify-start bg-[transparent] px-[0rem] pb-[0rem] pt-[0.156rem] text-[1rem] leading-[160.5%] text-neutral-white [border:none] [outline:none]"
                placeholder="Search by artwork name"
                type="text"
                onChange={(e) => {
                  setPerformSearchKey(false);
                  handleChangeSearchKey(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPerformSearchKey(true);
                    handleSearchByName();
                  }
                }}
              />
            </div>

            <div>
              <p className="mb-1 text-[1.1rem] text-white">Price</p>
              <div className="rounded-10xs border-gray-600 relative flex min-w-[8rem] cursor-pointer flex-row items-start justify-center gap-[0rem_0.625rem] overflow-hidden border-[1px] border-solid bg-[transparent] px-[1rem] py-[0.469rem] text-[1rem]">
                <select
                  defaultValue={sortedPrice}
                  className="relative cursor-pointer overflow-hidden border-0 bg-[transparent] text-[1rem]"
                  onChange={(e) => {
                    setSortedPrice(e.target.value);
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

            <div>
              <p className="mb-1 text-[1.1rem] text-white">Category</p>
              <div className="rounded-10xs border-gray-600 relative flex min-w-[8rem] cursor-pointer flex-row items-start justify-center gap-[0rem_0.625rem] overflow-hidden border-[1px] border-solid bg-[transparent] px-[1rem] py-[0.469rem] text-[1rem]">
                <select
                  defaultValue={searchCateId}
                  className="relative w-full cursor-pointer overflow-hidden border-0 bg-[transparent] text-[1rem]"
                  onChange={(e) => {
                    setSearchCateId(e.target.value);
                  }}
                >
                  {searchCateIdOptions.map((option, index) => (
                    <option key={index} value={option.categoryId}>
                      {option.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {searchKey != "" && performSearchKey ? (
            <>
              <div className="mq1150:flex-wrap flex max-w-full flex-row items-start justify-start gap-[0rem_0.875rem] self-stretch px-25">
                <h1 className="text-[1.2rem]">
                  All artworks found with {`"${searchKey}"`}
                </h1>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="mq800:gap-[0rem_2.25rem] mq450:gap-[0rem_1.125rem] flex max-w-full flex-row flex-wrap items-start justify-start gap-[0rem_4.563rem] self-stretch text-center text-[1.25rem]">
            <div className="mt-5 flex max-w-full flex-row flex-wrap items-start justify-start gap-[1rem_1rem] self-stretch pl-[3rem] text-whitesmoke">
              {artworkList
                .sort((a, b) => {
                  if (sortedPrice == sortedPriceOptions[0].value) {
                    return -1;
                  }
                  if (sortedPrice == sortedPriceOptions[1].value) {
                    return (
                      a.price -
                      (a.price * a.discount) / 100 -
                      (b.price - (b.price * b.discount) / 100)
                    );
                  }
                  if (sortedPrice == sortedPriceOptions[2].value) {
                    return (
                      b.price -
                      (b.price * b.discount) / 100 -
                      (a.price - (a.price * a.discount) / 100)
                    );
                  }
                  return -1;
                })
                .filter((artwork) => {
                  if (searchCateId == "-1") {
                    return true;
                  }
                  return artwork.categoryID == searchCateId;
                })
                .map((artwork, index) => {
                  return (
                    <ArtworkCard
                      key={index}
                      artworkId={artwork.artworkId}
                      maskGroup={artwork.imageUrl.split("://example")[0]}
                      artworkName={artwork.artworkName}
                      creatorkName={artwork.creator.name}
                      logoFrame="/images/shop/DiscoverPage/ellipse-2@2x.png"
                      price={artwork.price}
                      discount={artwork.discount}
                      translateYNumber={(index % 4) + 1}
                    />
                  );
                })}
              {/* <ArtworkCard
              maskGroup="https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg"
              artworkName="Dreamy Virgin"
              logoFrame="/images/shop/DiscoverPage/ellipse-2@2x.png"
              price="45.50"
              translateYNumber={1}
            />
            <ArtworkCard
              maskGroup="https://mpost.io/wp-content/uploads/image-74-7.jpg"
              artworkName="Red devil"
              logoFrame="/images/shop/DiscoverPage/ellipse-2@2x.png"
              price="45.50"
              translateYNumber={2}
            />
            <ArtworkCard
              maskGroup="/images/shop/DiscoverPage/mask-group-7@2x.png"
              artworkName="Emo Girl"
              logoFrame="/images/shop/DiscoverPage/ellipse-2@2x.png"
              price="45.50"
              translateYNumber={3}
            />
            <ArtworkCard
              maskGroup="/images/shop/DiscoverPage/mask-group-5@2x.png"
              artworkName="Practice I"
              logoFrame="/images/shop/DiscoverPage/ellipse-2@2x.png"
              price="FREE"
              translateYNumber={4}
            />
            <ArtworkCard
              maskGroup="/images/shop/DiscoverPage/mask-group-4@2x.png"
              artworkName="Squid Lady"
              logoFrame="/images/shop/DiscoverPage/ellipse-2@2x.png"
              price="45.50"
              translateYNumber={1}
            />
            <ArtworkCard
              maskGroup="/images/shop/DiscoverPage/mask-group-3@2x.png"
              artworkName="Practice II"
              logoFrame="/images/shop/DiscoverPage/ellipse-2@2x.png"
              price="FREE"
              translateYNumber={2}
            />
            <ArtworkCard
              maskGroup="/images/shop/DiscoverPage/mask-group@2x.png"
              artworkName="Da Viper"
              logoFrame="/images/shop/DiscoverPage/ellipse-2@2x.png"
              price="20.00"
              translateYNumber={3}
            />
            <ArtworkCard
              maskGroup="/images/shop/DiscoverPage/mask-group-2@2x.png"
              artworkName="snow3"
              logoFrame="/images/shop/DiscoverPage/ellipse-2@2x.png"
              price="45.50"
              translateYNumber={4}
            />
            <ArtworkCard
              maskGroup="/images/shop/DiscoverPage/mask-group-8@2x.png"
              artworkName="Yasha Nydoorin"
              logoFrame="/images/shop/DiscoverPage/ellipse-2@2x.png"
              price="45.50"
              translateYNumber={1}
            /> */}
            </div>
          </div>
        </div>
        <div
          style={{ transform: "translateY(-15px)" }}
          className="box-border flex w-full max-w-full justify-center px-[11.25rem] py-[0rem]"
        >
          <button className="rounded-10xs hover:bg-blueviolet-200 hover:border-blueviolet-100 cursor-pointer overflow-hidden border-[1px] border-solid border-primary-colour bg-[transparent] px-[2.625rem] py-[0.656rem] hover:box-border hover:border-[1px] hover:border-solid">
            <div className="font-barlow relative text-left text-[1rem] font-medium leading-[160.5%] text-primary-colour">
              Load more
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Discover;
