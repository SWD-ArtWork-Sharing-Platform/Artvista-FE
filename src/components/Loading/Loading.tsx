import React from "react";
import "./Loading.css";
import { NextPage } from "next";

type LoadingType = {
  loading?: boolean;
};

const Loading: NextPage<LoadingType> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loader" />
        <h1 className="mt-5" style={{ fontSize: "1rem" }}>
          Please wait for a few seconds...
        </h1>
      </div>
    </div>
  );
};

export default Loading;
