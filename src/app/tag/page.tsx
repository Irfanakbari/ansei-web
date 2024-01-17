"use client";
import React from "react";
import Barcode from "react-barcode";
import Image from "next/image";

export default function Tag() {

  return (
    <>
            <div className="max-w-screen-lg mx-auto flex flex-col gap-5 p-8">
                <div className="w-full mx-auto bg-white border-2 border-black">
                    <div className={'flex p-1 items-center gap-3'}>
                        <Image src={`/images/img.png`} alt={'Logo'} width={70} height={30}/>
                        <span className="text-sm font-semibold">PT VUTEQ INDONESIA</span>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Parts Number</span>
                            <span className={`text-lg mb-2`}>80500B040P</span>
                        </div>
                        <div className="w-1/3 border flex justify-center items-center">
                            <Barcode displayValue={false} height={30} value="barcode-example" />
                        </div>
                        <div className="w-1/3 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Order Quantity</span>
                            <span className={`text-lg mb-2 text-center`}>32</span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-3/4 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Parts Name</span>
                            <span className={`text-lg mb-2`}>LOCK & RC ASSY-FR DOOR,RH</span>
                        </div>
                        <div className="w-1/4 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Classification</span>
                            <span className={`text-lg mb-2 text-center`}>ZN21</span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/5 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Vendor Code</span>
                            <span className={`text-lg mb-2`}>D400171</span>
                        </div>
                        <div className="w-3/5 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Vendor Name</span>
                            <span className={`text-lg mb-2`}>PT ANSEI INDONESIA JAYA</span>
                        </div>
                        <div className="w-1/5 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Delivery Date</span>
                            <span className={`text-lg mb-2`}>2023/11/20</span>
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
                                <Barcode displayValue={false} height={30} value="200281811300040" />
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
                <div className="w-full mx-auto bg-white border-2 border-black">
                    <div className={'flex p-1 items-center gap-3'}>
                        <Image src={`/images/img.png`} alt={'Logo'} width={70} height={30}/>
                        <span className="text-lg font-semibold">PT VUTEQ INDONESIA</span>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Parts Number</span>
                            <span className={`text-lg mb-2`}>80500B040P</span>
                        </div>
                        <div className="w-1/3 border flex justify-center items-center">
                            <Barcode displayValue={false} height={30} value="barcode-example" />
                        </div>
                        <div className="w-1/3 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Order Quantity</span>
                            <span className={`text-lg mb-2 text-center`}>32</span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-3/4 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Parts Name</span>
                            <span className={`text-lg mb-2`}>LOCK & RC ASSY-FR DOOR,RH</span>
                        </div>
                        <div className="w-1/4 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Classification</span>
                            <span className={`text-lg mb-2 text-center`}>ZN21</span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/5 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Vendor Code</span>
                            <span className={`text-lg mb-2`}>D400171</span>
                        </div>
                        <div className="w-3/5 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Vendor Name</span>
                            <span className={`text-lg mb-2`}>PT ANSEI INDONESIA JAYA</span>
                        </div>
                        <div className="w-1/5 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Delivery Date</span>
                            <span className={`text-lg mb-2`}>2023/11/20</span>
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
                                <Barcode displayValue={false} height={30} value="200281811300040" />
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
                <div className="w-full mx-auto bg-white border-2 border-black">
                    <div className={'flex p-1 items-center gap-3'}>
                        <Image src={`/images/img.png`} alt={'Logo'} width={70} height={30}/>
                        <span className="text-lg font-semibold">PT VUTEQ INDONESIA</span>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Parts Number</span>
                            <span className={`text-lg mb-2`}>80500B040P</span>
                        </div>
                        <div className="w-1/3 border flex justify-center items-center">
                            <Barcode displayValue={false} height={30} value="barcode-example" />
                        </div>
                        <div className="w-1/3 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Order Quantity</span>
                            <span className={`text-lg mb-2 text-center`}>32</span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-3/4 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Parts Name</span>
                            <span className={`text-lg mb-2`}>LOCK & RC ASSY-FR DOOR,RH</span>
                        </div>
                        <div className="w-1/4 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Classification</span>
                            <span className={`text-lg mb-2 text-center`}>ZN21</span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/5 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Vendor Code</span>
                            <span className={`text-lg mb-2`}>D400171</span>
                        </div>
                        <div className="w-3/5 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Vendor Name</span>
                            <span className={`text-lg mb-2`}>PT ANSEI INDONESIA JAYA</span>
                        </div>
                        <div className="w-1/5 border flex flex-col ">
                            <span className={`text-sm text-gray-600`}>Delivery Date</span>
                            <span className={`text-lg mb-2`}>2023/11/20</span>
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
                                <Barcode displayValue={false} height={30} value="200281811300040" />
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
    </>
  );
}
