"use client";
import categoryManagementApi from "@/api/management/category";
import interactionManagementApi from "@/api/management/interaction";
import postManagementApi from "@/api/management/post";
import artworkMarketApi from "@/api/market/artwork";
import Loading from "@/components/Loading/Loading";
import useAppContext from "@/hooks/useAppContext";
import { PATH_SHOP } from "@/routes/paths";
import { InteractionManagementDTO } from "@/types/management/InteractionManagementDTO";
import { PostManagementDTO } from "@/types/management/PostManagementDTO";
import { ArtworkDTO } from "@/types/market/ArtworkDTO";
import { getUserInfoId } from "@/utils/utils";
import { Watermark } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ArtworkDetail = (props: {}) => {
  const params = useParams();
  const artworkId = params.artworkId as string;
  const [artworkDetail, setArtworkDetail] = useState<ArtworkDTO | null>(null);
  const [post, setPost] = useState<PostManagementDTO | null>(null);
  const [artworkCategory, setArtworkCategory] = useState<any>(null);
  const [allInteractionQuantity, setAllInteractionQuantity] =
    useState<number>(0);
  const [allInteractionList, setAllInteractionList] = useState<
    InteractionManagementDTO[]
  >([]);
  const [interactionOfPost, setInteractionOfPost] = useState<
    InteractionManagementDTO[]
  >([]);
  const [interactionOfUser, setInteractionOfUser] = useState<
    InteractionManagementDTO[] | null
  >(null);
  const { isLoading, enableLoading, disableLoading } = useAppContext();
  const router = useRouter();
  console.log(artworkDetail, post, artworkCategory, new Date().toISOString());

  const renderArtworkDetail = () => {
    enableLoading();
    artworkMarketApi
      .getAllArtworkMarketWithCondition()
      .then((response) => {
        if (response.data.isSuccess && response.data.result) {
          setArtworkDetail(
            response.data.result.filter(
              (artwork: ArtworkDTO) => artwork.artworkId == artworkId
            )[0]
          );
        }
      })
      .catch((error) => {
        console.log(error);
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
          if (artworkDetail != null) {
            setArtworkCategory(
              response.data.result.result.filter(
                (category: any) =>
                  category.categoryId == artworkDetail?.categoryID
              )[0]
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        disableLoading();
      });
  };

  const getAllInteractionQuantity = () => {
    interactionManagementApi
      .getAllInteraction()
      .then((response) => {
        if (
          response.data.isSuccess &&
          response.data.result &&
          response.data.result.isSuccess
        ) {
          setAllInteractionList(response.data.result.result);
          setAllInteractionQuantity(response.data.result.result.length);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getInteractionOfPost = (postId: string) => {
    interactionManagementApi
      .getInteractionByPostID(postId)
      .then((response) => {
        if (
          response.data.isSuccess &&
          response.data.result &&
          response.data.result.isSuccess
        ) {
          setInteractionOfPost(response.data.result.result);

          var userId = getUserInfoId();
          if (userId) {
            setInteractionOfUser(
              response.data.result.result.filter(
                (x: any) => (x.id = userId && (x.like > 0 || x.comments != ""))
              )
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getAllInteractionQuantity();
      });
  };

  const renderPost = () => {
    var postId = "";
    postManagementApi
      .getAllPost()
      .then((response) => {
        if (
          response.data.isSuccess &&
          response.data.result &&
          response.data.result.isSuccess &&
          response.data.result.result
        ) {
          var post = response.data.result.result.filter(
            (post: PostManagementDTO) => post?.artworkId == artworkId
          )[0];
          setPost(post);
          postId = post.postId;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getInteractionOfPost(postId);
        disableLoading();
      });
  };

  const handleLikePost = () => {
    enableLoading();
    var interactionList = [...allInteractionList];
    const id = (
      parseInt(
        interactionList.reduce((max, current) =>
          max.id > current.id ? max : current
        ).interactionId
      ) + 1
    ).toString();

    interactionManagementApi
      .createInteraction(
        id,
        getUserInfoId(),
        new Date().toISOString(),
        1,
        "",
        post ? post.postId : ""
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        renderPost();
      });
  };

  const handleUnLikePost = () => {
    enableLoading();

    if (interactionOfUser?.filter((x) => x.like > 0)[0]) {
      var interaction = interactionOfUser?.filter((x) => x.like > 0)[0];
      interactionManagementApi
        .deleteInteraction(interaction.interactionId)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          renderPost();
        });
    }
  };

  useEffect(() => {
    renderArtworkDetail();
    renderPost();
  }, []);

  useEffect(() => {
    renderCategory();
  }, [artworkDetail]);

  if (artworkDetail == null || post == null || artworkCategory == null) {
    return (
      <>
        <Loading loading={isLoading} />
      </>
    );
  }

  return (
    <>
      {" "}
      <Loading loading={isLoading} />
      <div className="font-barlow flex w-full  max-w-full flex-col items-start justify-start text-left text-[1.75rem] text-gray">
        <h3 className="font-inherit mq450:text-[1.375rem] relative m-0 inline-block max-w-full text-inherit font-medium">{`Discover / ${artworkDetail.artworkName}`}</h3>
        <div className="text-bg font-para2-semi-14 mt-[-0.312rem] flex max-w-full flex-col items-end justify-start gap-[0.5rem_0rem] self-stretch text-[0.875rem]">
          <div className="flex flex-row items-start justify-start gap-[0rem_1.375rem]">
            <div className="flex flex-row items-start justify-start gap-[0rem_0.5rem]"></div>
          </div>
          <div className="font-barlow flex max-w-full flex-row items-start justify-start self-stretch text-neutral-white">
            <div className="mq750:flex-wrap flex w-[33.875rem] max-w-full flex-row items-start justify-between gap-[1.25rem]">
              <div className="flex flex-row items-start justify-start gap-[0rem_0.25rem]">
                <div className="relative leading-[1.313rem]">by</div>
                <div
                  className="relative capitalize leading-[1.313rem] text-primary-colour cursor-pointer"
                  onClick={() => {
                    router.push(
                      PATH_SHOP.creator.visitPage(artworkDetail.creator.id)
                    );
                  }}
                >
                  {artworkDetail.creator.name}
                </div>
                <div className="relative leading-[1.313rem]">in</div>
                <div
                  className="relative leading-[1.313rem] text-primary-colour cursor-pointer"
                  onClick={() => {
                    localStorage.setItem(
                      "DISCOVER_CATEGORY_SORT",
                      artworkDetail.categoryID
                    );
                    router.push(PATH_SHOP.general.discover);
                  }}
                >
                  {artworkCategory.categoryName}
                </div>
              </div>
              {/* <div className="font-para2-semi-14 flex flex-row items-start justify-start gap-[0rem_0.313rem] text-[0.75rem]">
                <div className="flex flex-row items-start justify-start overflow-hidden rounded-sm bg-primary-colour py-[0rem] pl-[0.25rem] pr-[0.313rem]">
                  <div className="relative leading-[1.313rem]">5.0</div>
                </div>
                <div className="font-barlow relative text-[1rem] leading-[1.313rem]">
                  based on 10 ratings, 2 reviews
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="text-neutral-black font-icons-18 mq750:gap-[1.188rem_0rem] mt-8 flex w-[83.813rem] max-w-full flex-col items-start justify-start gap-[2.438rem_0rem] text-center text-[1.125rem]">
        <div className="mq750:gap-[0rem_1.063rem] flex max-w-full flex-row items-start justify-start gap-[0rem_2.188rem] self-stretch lg:flex-wrap">
          <div className="mq750:min-w-full box-border flex min-w-[33.375rem] max-w-full flex-1 flex-col items-start justify-start px-[0rem] pb-[0rem] pt-[0.25rem]">
            <Watermark
              content={"Artvista"}
              style={{
                fontWeight: "bold",
              }}
              className="w-full"
            >
              <div
                style={{
                  backgroundImage: `url(${artworkDetail.imageUrl.split("://example")[0]})`,
                }}
                className="Artwork Name
                box-border flex h-[38.813rem] max-w-full flex-row items-start justify-end self-stretch rounded-xl bg-cover bg-[top] bg-no-repeat px-[1.75rem] py-[1.875rem]"
              >
                <div
                  onClick={() => {
                    if (
                      interactionOfUser &&
                      interactionOfUser?.filter((x) => x.like > 0).length > 0
                    ) {
                      handleUnLikePost();
                    } else {
                      handleLikePost();
                    }
                  }}
                  style={{
                    backgroundColor: `${interactionOfUser && interactionOfUser?.filter((x) => x.like > 0).length > 0 ? "#a259ff" : ""}`,
                    border: `${interactionOfUser && interactionOfUser?.filter((x) => x.like > 0).length > 0 ? "none" : ""}`,
                    color: `${interactionOfUser && interactionOfUser?.filter((x) => x.like > 0).length > 0 ? "#fff" : ""}`,
                  }}
                  className="z-[1] box-border flex h-[2.688rem] w-[5.438rem] cursor-pointer flex-row items-center justify-center rounded-full border-[1px] border-solid border-dimgray-100 bg-neutral-white py-[0.625rem] pl-[1.125rem] pr-[1.375rem]"
                >
                  <div className="flex flex-col items-start justify-start px-[0rem] pb-[0rem] pt-[0.094rem]">
                    <div className="relative mx-1">♡</div>
                  </div>
                  <b className="font-text-labels-14px-bold relative text-left text-[0.875rem] leading-[1.313rem] mx-1">
                    {interactionOfPost && interactionOfPost.length > 0
                      ? interactionOfPost.length
                      : "0"}
                  </b>
                </div>
              </div>
            </Watermark>
          </div>
          <div className="font-barlow mq750:gap-[1.5rem_0rem] mq750:min-w-full flex w-[30.313rem] min-w-[30.313rem] max-w-full flex-col items-start justify-start gap-[3rem_0rem] text-left text-[0.938rem] text-neutral-white lg:flex-1">
            <div className="mq450:pt-[1.25rem] mq450:pb-[1.25rem] mq450:box-border box-border flex max-w-full flex-col items-start justify-start gap-[1.25rem_0rem] self-stretch overflow-hidden rounded-md border-[2px] border-solid border-dimgray-100 px-[1.188rem] pb-[1.313rem] pt-[1.688rem]">
              <div className="mq450:flex-wrap flex flex-row items-start justify-between gap-[1.25rem] self-stretch text-[1.25rem]">
                <div className="flex flex-col items-start justify-start gap-[1.25rem_0rem]">
                  <div className="mq450:text-[1rem] mq450:leading-[1.063rem] relative font-semibold leading-[1.313rem]">
                    {artworkDetail.artworkName}
                  </div>
                  {/* <div className="text-gray-500 flex flex-row items-start justify-start gap-[0rem_0.5rem] text-[0.938rem]">
                    <div className="relative font-medium leading-[1.313rem]">{`License: `}</div>
                    <div className="relative font-medium leading-[1.313rem] text-primary-colour">
                      Change
                    </div>
                  </div> */}
                </div>
                <div className="mq450:text-[1rem] mq450:leading-[1.063rem] relative font-semibold leading-[1.313rem] text-primary-colour">
                  {artworkDetail.discount &&
                  artworkDetail.price &&
                  artworkDetail.discount > 0
                    ? artworkDetail.price -
                      (artworkDetail.price * artworkDetail.discount) / 100
                    : artworkDetail.price}{" "}
                  VND
                  <span className="ml-2 text-grey line-through">
                    {artworkDetail.discount &&
                    artworkDetail.price &&
                    artworkDetail.discount > 0
                      ? `${artworkDetail.price} VND`
                      : ""}
                  </span>
                </div>
              </div>
              <div className="relative inline-block w-[26.5rem] max-w-full font-medium capitalize leading-[1.313rem]">
                {post.description}
              </div>
              <button className="hover:bg-blueviolet-100 flex cursor-pointer flex-row items-start justify-center self-stretch whitespace-nowrap rounded-md bg-primary-colour px-[1.25rem] py-[1rem] [border:none]">
                <div className="font-barlow relative inline-block text-center text-[1.125rem] font-medium leading-[1.5rem] text-neutral-white">
                  Purchase Now
                </div>
              </button>
              <button className="hover:bg-blueviolet-200 hover:border-blueviolet-100 flex cursor-pointer flex-row items-start justify-center self-stretch rounded-md border-[1px] border-solid border-primary-colour bg-[transparent] px-[1.25rem] py-[1rem] hover:box-border hover:border-[1px] hover:border-solid">
                <div className="font-barlow relative inline-block text-center text-[1.125rem] font-medium leading-[1.5rem] text-primary-colour">
                  Add To Wishlist
                </div>
              </button>
            </div>
            <div className="text-bg font-para2-semi-14 flex flex-col items-start justify-start gap-[0.625rem_0rem] self-stretch text-[0.75rem]">
              <div className="relative font-medium leading-[1.125rem]">
                CATEGORY
              </div>
              <div className="flex flex-col items-start justify-start gap-[0.5rem_0rem] self-stretch">
                <div className="mq750:flex-wrap flex flex-row items-start justify-start gap-[0rem_0.75rem] self-stretch">
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "DISCOVER_CATEGORY_SORT",
                        artworkDetail.categoryID
                      );
                      router.push(PATH_SHOP.general.discover);
                    }}
                    className="hover:bg-silver-300 flex cursor-pointer flex-col items-start justify-start rounded-full bg-chip-fill px-[1.25rem] py-[0.75rem] [border:none]"
                  >
                    <b className="font-barlow text-bg relative text-left text-[0.75rem] leading-[1.125rem]">
                      {artworkCategory.categoryName}
                    </b>
                  </button>
                  <button
                    onClick={() => {
                      router.push(PATH_SHOP.general.discover);
                    }}
                    className="flex cursor-pointer flex-row items-start justify-start bg-[transparent] p-0 [border:none]"
                  >
                    <div className="flex flex-col items-start justify-start whitespace-nowrap rounded-full bg-chip-fill px-[1.25rem] py-[0.75rem]">
                      <b className="font-barlow relative text-left text-[0.75rem] leading-[1.125rem] text-grey">
                        See more..
                      </b>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtworkDetail;
