
import React from "react";
import { Skeleton } from 'antd';

export default function TableSkeleton(){
  return (
    <div className="dashboard-skeleton">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  )

}