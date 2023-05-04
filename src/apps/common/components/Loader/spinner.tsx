import React from "react";
import { Spin } from "antd";

interface Props {
}

export default function Spiner(props: Props) {
  return (
    <div className="spinner-container">
      < Spin size="large" tip="Loading..." />
    </div >
  );
};;
