import React from "react";
import Image from "next/image";
import Barcode from "react-barcode";
import dayjs from "dayjs";



export class LabelComponent extends React.Component<RawData> {
  render() {
    const {partsNumber, poNumber, deliveryDate, vendorName, vendorCode,classification, partsName, orderQuantity} = this.props;
    return (
      <div className="flex w-full p-1 mt-2 h-full">
        <div className="w-full mx-auto bg-white border-2 border-black">
          <div className={'flex p-1 items-center gap-3'}>
            <Image src={`/images/img.png`} alt={'Logo'} width={70} height={30}/>
            <span className="text-sm font-semibold">PT VUTEQ INDONESIA</span>
          </div>
          <div className="flex">
            <div className="w-1/3 border flex flex-col ">
              <span className={`text-sm text-gray-600`}>Parts Number</span>
              <span className={`text-lg mb-2`}>{partsNumber}</span>
            </div>
            <div className="w-1/3 border flex justify-center items-center">
              <Barcode displayValue={false} height={30} value={partsNumber} />
            </div>
            <div className="w-1/3 border flex flex-col ">
              <span className={`text-sm text-gray-600`}>Order Quantity</span>
              <span className={`text-lg mb-2 text-center`}>{orderQuantity}</span>
            </div>
          </div>
          <div className="flex">
            <div className="w-3/4 border flex flex-col ">
              <span className={`text-sm text-gray-600`}>Parts Name</span>
              <span className={`text-lg mb-2`}>{partsName}</span>
            </div>
            <div className="w-1/4 border flex flex-col ">
              <span className={`text-sm text-gray-600`}>Classification</span>
              <span className={`text-lg mb-2 text-center`}>{classification}</span>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/5 border flex flex-col ">
              <span className={`text-sm text-gray-600`}>Vendor Code</span>
              <span className={`text-lg mb-2`}>{vendorCode}</span>
            </div>
            <div className="w-3/5 border flex flex-col ">
              <span className={`text-sm text-gray-600`}>Vendor Name</span>
              <span className={`text-lg mb-2`}>{vendorName}</span>
            </div>
            <div className="w-1/5 border flex flex-col ">
              <span className={`text-sm text-gray-600`}>Delivery Date</span>
              <span className={`text-lg mb-2`}>{dayjs(deliveryDate).format('DD/MM/YYYY')}</span>
            </div>
            {/*<div className="w-1/6 p-1 border flex flex-col gap-3">*/}
            {/*    <span className={`text-sm text-gray-600`}>Period</span>*/}
            {/*    <span className={`text-2xl mb-3`}>1</span>*/}
            {/*</div>*/}
          </div>
          <div className="flex">
            <div className="w-1/2 border flex flex-col">
              <span className={`text-sm text-gray-600`}>PO Number</span>
              <div className={`w-full flex justify-center`}>
                <Barcode displayValue={false} height={30} value={poNumber} />
              </div>
            </div>
            <div className="w-1/2 border flex flex-col">
              <span className={`text-sm text-gray-600`}>Label Number</span>
              <div className={`w-full flex justify-center`}>
                <Barcode  displayValue={false} height={30} value="20028181130004000100016" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
