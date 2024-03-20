"use client";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./index.scss";
import { getUserAvatar } from "@/utils/useFirebaseStorage";
import { formatPrice } from "@/utils/formatPrice";

export type PackageCardType = {
  packageId: string;
  packageName: string;
  maximumArtworks: number;
  price: number;
  discount: number;
  packageTime?: any;
};

const PackageCard: NextPage<PackageCardType> = ({
  packageId,
  packageName,
  maximumArtworks,
  price,
  discount,
  packageTime,
}) => {
  const router = useRouter();

  return (
    <div
      className="mt-10 w-[28%] pricing-gd-left pric-7 active overflow-hidden"
      style={{ borderRadius: "8px" }}
    >
      <div className="w3l-pricing-7">
        <div
          className="w3l-pricing-7-top bg-purple-900 mt-0"
          style={{ paddingTop: "1rem", paddingBottom: "0.8rem" }}
        >
          <h5
            style={{ borderRadius: "5px", fontWeight: "bolder" }}
            className="bg-white inline-block text-purple-900 px-4 py-1"
          >
            {discount > 0 ? `Save ${discount}%` : "Good Package"}
          </h5>
          <h1
            style={{ fontSize: "2rem", fontWeight: "bolder" }}
            className="my-2"
          >
            {packageName}
          </h1>
          <h4 style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
            {formatPrice(price - (price * discount) / 100)}
            {" VND"}
          </h4>
        </div>
        <div
          style={{ paddingTop: "15px", paddingBottom: "20px" }}
          className="w3l-pricing-7-bottom bg-black-2 text-neutral-200"
        >
          <div className="w3l-pricing-7-bottom-bottom">
            <ul className="links">
              <li className="mb-3">
                <p className="lists">Maximum Artworks: {maximumArtworks} </p>
              </li>
              <li className="mb-3">
                <p className={`lists`}>
                  Default Price:{" "}
                  <span className={`${discount > 0 ? "line-through" : ""}`}>
                    {formatPrice(price)} {" VND"}
                  </span>
                </p>
              </li>
              {packageTime ? (
                <li className="mb-3">
                  <p className="lists line-through">Time: {packageTime}</p>
                </li>
              ) : (
                <></>
              )}
            </ul>
            <div
              className="header_links_hover cursor-pointer mt-4 mb-3 py-3 px-1 buy-button bg-purple-900"
              style={{ borderRadius: "5px" }}
            >
              <a className=" popup btn btn-style btn-primary " href="#buy">
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
