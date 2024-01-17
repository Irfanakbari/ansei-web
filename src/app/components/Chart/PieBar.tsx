"use client";
import { Pie, PieConfig } from "@ant-design/plots";
import React, { useState } from "react";
import { Spin } from "antd";

const BarPie = ({data}:{data: any}) => {
  const [loading, setLoading] = useState(true)

  const config: PieConfig = {
    appendPadding: 10,
    data,
    loading: loading,
    animation: false,
    autoFit: true,
    loadingTemplate: <Spin/>,
    angleField: 'total',
    colorField: 'status',
    radius: 0.9,
    legend: false,
    color: ['#de5767','#98FB98'],
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} onReady={()=>setLoading(false)}  />;
};

export default BarPie