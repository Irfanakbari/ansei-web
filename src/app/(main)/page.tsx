"use client";
import React, {useEffect, useState} from "react";
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import Image from "next/image";
import {BiCheck, BiCross, BiExitFullscreen, BiFullscreen, BiSolidMoon, BiSolidSun} from "react-icons/bi";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import useTabStore, {TabStore} from "@/app/context/Tab/TabStore";
import useStore from "@/app/context/Tab/useStore";
import {Card, Statistic, Table} from "antd";
import {io} from "socket.io-client";
import {MdPallet} from "react-icons/md";
import dayjs from "dayjs";

export default function Dashboard() {
  const axiosAuth = useAxiosAuth()
  const [dark, setDark] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    total: 0,
    success: 0,
    failed: 0,
  })
  const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([])
  const [dataChart2, setDataChart2] = useState([])
  const handle = useFullScreenHandle();
  const tabStore : TabStore| any = useStore(useTabStore, (state) => state)

  useEffect(() => {
    // fetchData()
    tabStore?.addTab({
      label: 'Dashboard',
      path: '/',
      id: 'Dashboard'
    })
    // const interval = setInterval(fetchData, 5000); // Panggil fetchData setiap 3 detik
    // return () => {
    //   clearInterval(interval); // Hentikan interval saat komponen dibongkar
    // };
  }, [])

  useEffect(() => {
    // Create a socket connection
    const socket = io('https://api.vuteq.co.id');

    // Listen for incoming messages
    socket.on('message', (message) => {
      console.log('Incoming message:', message);
      setCardInfo({
        total: message.all.total,
        success: message.all.success,
        failed: message.all.failed,
      })
      setDataChart2(message.daily)
        setHistory(message.lastTen)
      setLoading(false)
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);


  const fetchData = async () => {
    try {
      const response = await axiosAuth.get('/dashboard',{
        cache: false
      });
      setDataChart2(response.data['dayStat'] ?? [])
      // setDataChart3(response.data['successRate'] ?? [])
    } catch (e: any) {
      // showErrorToast("Gagal Fetch Data");
    } finally {
      setLoading(false)
    }
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      width: '5%',
      render: (_: any, __: any, index: any) => index + 1
    },
    {
      title: 'PO No',
      dataIndex: 'po_no',
      width: '25%',
    },
    {
      title: 'Part No',
      dataIndex: 'part_no',
    },
    {
      title: 'PO ID',
      dataIndex: 'po_id',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      render: (_: any, record: any) => record.timestamp && dayjs(record.timestamp).format('DD-MMMM-YYYY  HH:MM')
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  return (
    <>
      <>
        <div className={`bg-white h-full flex flex-col`}>
          <FullScreen handle={handle} className={`w-full p-2 flex-grow bg-white overflow-hidden${
            handle.active ? dark ? '' : 'bg-white' : 'bg-white'}`}>
            <div className={`py-1.5 px-2 text-white flex flex-row justify-between ${
              handle.active ? dark ? '' : 'bg-[#2589ce]' : 'bg-[#2589ce]'}`}>
              <div className={`flex flex-row justify-between w-full mr-1 items-center`}>
                <div className={`flex items-center gap-4`}>
                  <Image src={'/images/img.png'} alt={'Logo'} width={90} height={80}/>
                  <h2 className={`font-bold text-[18px] hidden md:block`}>PT VUTEQ INDONESIA - Ansei Delivery System</h2>
                </div>
              </div>
              <div className={`flex gap-3`}>
                {
                  dark ? <div
                    onClick={() => setDark(false)}
                    className={`flex items-center`}>
                    <BiSolidSun size={20}/>
                  </div> : <div
                    onClick={() => setDark(false)}
                    className={`flex items-center`}>
                    <BiSolidMoon size={20}/>
                  </div>
                }
                {handle.active ? <div
                  onClick={handle.exit}
                  className={`flex items-center`}>
                  <BiExitFullscreen size={20}/>
                </div> : <div
                  onClick={handle.enter}
                  className={`flex items-center`}>
                  <BiFullscreen size={20}/>
                </div>}
              </div>
            </div>
            <div className={`w-full p-5`} style={{
              maxHeight: handle.active ? '100vh' : '75vh',
              overflowY: 'scroll',
              paddingBottom: handle.active ? '8vh' : '5vh'
            }}>
              <div
                  className={`flex flex-col gap-5 text-white mt-1 mb-5`}>
                <div
                    className={`grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 pt-2 grid gap-5 text-white mb-5`}>
                  <Card bordered={true} className={`shadow shadow-gray-400`}>
                    <Statistic
                        title="Total Data"
                        value={cardInfo.total}
                        precision={0}
                        loading={loading}
                        groupSeparator={'.'}
                        valueStyle={{color: 'deepskyblue'}}
                        prefix={<MdPallet/>}
                        suffix="Data"
                    />
                  </Card>
                  <Card bordered={true} className={`shadow shadow-gray-400`}>
                    <Statistic
                        title="Berhasil Scan"
                        value={cardInfo.success}
                        loading={loading}
                        precision={0}
                        groupSeparator={'.'}
                        valueStyle={{color: '#3f8600'}}
                        prefix={<BiCheck/>}
                        suffix="Data"
                    />
                  </Card>
                  <Card bordered={true} className={`shadow shadow-gray-400`}>
                    <Statistic
                        title="Gagal Scan"
                        value={cardInfo.failed}
                        loading={loading}
                        precision={0}
                        groupSeparator={'.'}
                        valueStyle={{color: 'orangered'}}
                        prefix={<BiCross/>}
                        suffix="Data"
                    />
                  </Card>
                </div>
                <div
                    className={`grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 pt-2 grid gap-5 text-white mb-5`}>
                  {/*<Card title={'Statistik Harian'} bordered={true} className={`shadow shadow-gray-400 `}>*/}
                  {/*  <StatBar data={dataChart2.reverse()}/>*/}
                  {/*</Card>*/}
                  <Card title={'Update Terbaru'} className={`w-full overflow-x-scroll shadow shadow-gray-400`}>
                    <div>
                      <Table
                          loading={loading}
                          bordered
                          rowKey={'id_pallet'} columns={columns} dataSource={history} size={'small'}
                          rowClassName="editable-row"
                          pagination={false}/>
                    </div>
                  </Card>
                  {/*<Card title={'Tingkat Keberhasilan Scan'} bordered={true} className={`shadow shadow-gray-400 col-span-1`}>*/}
                  {/*  <BarPie data={dataChart3}  />*/}
                  {/*</Card>*/}
                </div>
                {/*<div*/}
                {/*    className={`grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 pt-2 grid gap-5 text-white mb-5`}>*/}
                {/*  /!*<Card title={'Update Terbaru'} className={`w-full overflow-x-scroll mb-5 shadow shadow-gray-400`}>*!/*/}
                {/*  /!*  <div>*!/*/}
                {/*  /!*    <Table*!/*/}
                {/*  /!*        loading={loading}*!/*/}
                {/*  /!*        bordered*!/*/}
                {/*  /!*        rowKey={'id_pallet'} columns={columns} dataSource={history} size={'small'}*!/*/}
                {/*  /!*        rowClassName="editable-row"*!/*/}
                {/*  /!*        pagination={false}/>*!/*/}
                {/*  /!*  </div>*!/*/}
                {/*  /!*</Card>*!/*/}
                {/*  /!*<Card title={'Tingkat Keberhasilan Scan'} bordered={true} className={`shadow shadow-gray-400 col-span-1`}>*!/*/}
                {/*  /!*  <BarPie data={dataChart3}  />*!/*/}
                {/*  /!*</Card>*!/*/}
                {/*</div>*/}
              </div>
              {/*<div className={`grid-cols-1 lg:grid-cols-3 pt-2 grid gap-5 mb-5`}>*/}
              {/*  <Card title={'Statistik Harian'} bordered={true} className={`shadow shadow-gray-400 col-span-2`}>*/}
              {/*    <StatBar data={dataChart2}  />*/}
              {/*  </Card>*/}
              {/*  <Card title={'Tingkat Keberhasilan Scan'} bordered={true} className={`shadow shadow-gray-400 col-span-1`}>*/}
              {/*    <BarPie data={dataChart3}  />*/}
              {/*  </Card>*/}
              {/*  /!*<Card title={'Statistik Scan Harian'} bordered={true} className={`shadow shadow-gray-400 col-span-3`}>*!/*/}
              {/*  /!*  <GroupBar data={dataChart1}  />*!/*/}
              {/*  /!*</Card>*!/*/}
              {/*</div>*/}
              {/*<Result*/}
              {/*    icon={<SmileOutlined/>}*/}
              {/*    title="Great, we have done all the operations!"*/}
              {/*    extra={<Button type="primary">Next</Button>}*/}
              {/*/>*/}
            </div>
          </FullScreen>
        </div>
      </>
    </>
  );
}

