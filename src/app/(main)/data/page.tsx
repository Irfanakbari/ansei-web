"use client";
import React, {useEffect, useState} from "react";
import {BiPlusMedical, BiRefresh, BiTrash} from "react-icons/bi";
import {message, Table} from "antd";
import {useForm} from "react-hook-form";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import useTabStore, {TabStore} from "@/app/context/Tab/TabStore";
import useStore from "@/app/context/Tab/useStore";
import AddModalLayout from "@/app/components/Pages/Master/Raw/AddModal";
import dayjs from "dayjs";
import {ColumnsType} from "antd/es/table";
import PrintAll from "@/app/components/Pages/Master/Raw/Print/PrintAll";

export default function Data() {
  const [data, setData] = useState<any>({})
  const [modal, setModal] = useState(false)
  const tabStore : TabStore| any = useStore(useTabStore, (state) => state)
  const [messageApi, contextHolder] = message.useMessage();
  const [selected, setSelected] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading1, setLoading] = useState<boolean>(true)
  const {
    register,
    handleSubmit,
    reset
  } = useForm()
  const axiosInstance = useAxiosAuth()


  useEffect(() => {
    setLoading(false)
    tabStore?.addTab({
      label: 'Master Raw Data',
      path: '/data',
      id: 'Master Raw Data'
    })
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/raw',{
        cache: false
      });
      setData(response.data)
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Gagal Mengambil Data',
      });
    } finally {
      setLoading(false)
    }
  };

  const onChange = (pagination: any) => {
    setLoading(true);

    const url = `/raw?page=${pagination.current}&limit=${pagination.pageSize}`;
    axiosInstance.get(url,{
      cache: false
    })
        .then(response => {
          setData(response.data);
        })
        .catch(() => {
          messageApi.open({
            type: 'error',
            content: 'Gagal Mengambil Data',
          });
        })
        .finally(() => {
          setLoading(false);
        });

  };

  const submitImport = (data: any) => {
    const formData = new FormData();
    formData.append("file", data.file[0]); // "excel_file" harus sesuai dengan nama field pada backend yang menerima file Excel
    axiosInstance
        .post('/raw', formData,{
          headers: {
            'Content-Type': 'multipart/form-data', // Pastikan header Content-Type diatur ke 'multipart/form-data'
          }
        })
        .then(() => {
          messageApi.open({
            type: 'success',
            content: 'Import Sukses',
          });
          fetchData();
        })
        .catch((e) => {
          messageApi.open({
            type: 'error',
            content: 'Gagal Import Data',
          });
        })
        .finally(() => {
          // setModal(false);
          // reset();
        });
  };


  const columns: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'index',
      fixed: 'left',
      render: (_: any, __: any, index: any) => (data.currentPage - 1) * data.limit + index + 1,
      width: 50
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: 120,
      render: (text: any) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Vendor Code',
      dataIndex: 'vendorCode',
      width: 120,
    },
    {
      title: 'Vendor Name',
      dataIndex: 'vendorName',
      width: 220,
    },
    {
      title: 'Receiving Area',
      dataIndex: 'receivingArea',
      width: 120,
    },
    {
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      width: 120,
      render: (text: any) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Delivery Period',
      width: 130,
      dataIndex: 'deliveryPeriod',
    },
    {
      title: 'Firm',
      width: 100,
      dataIndex: 'firm',
    },
    {
      title: 'Classification',
      width: 120,
      dataIndex: 'classification',
    },
    {
      title: 'PO Number',
      width: 120,
      dataIndex: 'poNumber',
    },
    {
      title: 'Item',
      width: 100,
      dataIndex: 'item',
    },
    {
      title: 'Parts Number',
      width: 120,
      dataIndex: 'partsNumber',
    },
    {
      title: 'Parts Name',
      width: 280,
      dataIndex: 'partsName',
    },
    {
      title: 'Order Quantity',
      width: 120,
      dataIndex: 'orderQuantity',
    },
  ];

  const handleRowSelection = (selectedRowKeys: any, selectedRows: any) => {
    setSelected(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  function deleteData() {
    axiosInstance
        .delete('/raw',)
        .then(() => {
          messageApi.open({
            type: 'success',
            content: 'Hapus Data Sukses',
          });
          fetchData();
        })
        .catch((e) => {
          messageApi.open({
            type: 'error',
            content: 'Gagal Hapus Data',
          });
        })
        .finally(() => {
          // setModal(false);
          reset();
        });
  }

  return (
    <>
      {contextHolder}
      <div className={`bg-white h-full flex flex-col`}>
        {modal && (
          <AddModalLayout close={() => setModal(false)} onSubmit={handleSubmit(submitImport)}
                          register={register}/>)}

        <div className="w-full bg-base py-0.5 px-1 text-white flex flex-row">
          <div
              onClick={() => setModal(true)}
              className="flex-row flex items-center gap-1 px-3 py-1 hover:bg-[#2589ce] hover:cursor-pointer"
          >
            <BiPlusMedical size={12}/>
            <p className="text-white font-bold text-sm">Baru</p>
          </div>
          <div
              onClick={fetchData}
              className="flex-row flex items-center gap-1 px-3 py-1 hover:bg-[#2589ce] hover:cursor-pointer"
          >
            <BiRefresh size={12}/>
            <p className="text-white font-bold text-sm">Refresh</p>
          </div>
          <div
              onClick={deleteData}
              className="flex-row flex items-center gap-1 px-3 py-1 hover:bg-[#2589ce] hover:cursor-pointer"
          >
            <BiTrash size={12}/>
            <p className="text-white font-bold text-sm">Hapus Data</p>
          </div>
          {
              selected.length > 0 && <PrintAll data={selected ?? []}/>
          }
        </div>
        <div className="w-full bg-white p-2 flex-grow overflow-hidden">
          <Table
              loading={loading1}
              bordered
              rowSelection={{
                // checkStrictly:true,
                selectedRowKeys,
                onChange: handleRowSelection,
                preserveSelectedRowKeys: true
              }}
              scroll={{
                y: "65vh"
              }}
              onChange={onChange}
              rowKey={'id'} columns={columns} dataSource={data.data} size={'small'}
              rowClassName="editable-row"
              pagination={{
                total: data['totalData'],
                defaultPageSize: 100,
                hideOnSinglePage: true,
                pageSizeOptions: [100, 300, 500, 1000, 2000],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
              }}
            />
        </div>
      </div>
    </>
  );
}
