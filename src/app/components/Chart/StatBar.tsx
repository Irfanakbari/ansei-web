"use client";
import React, { useState } from "react";
import {Line, LineConfig} from "@ant-design/plots";
import { Spin } from "antd";

const StatBar = ({data} : {data: any}) => {
  const [loading, setLoading] = useState(true)
  const config: LineConfig = {
    data,
    animation: false,
    padding: 'auto',
    loading: loading,
    loadingTemplate: <Spin/>,
    xField: 'Date',
    yField: 'total',
    // xAxis: {
    //   // type: 'timeCat',
    //   tickCount: 10,
    // },
  };
  return (
    <Line {...config} onReady={()=>setLoading(false)} />)
};

export default StatBar