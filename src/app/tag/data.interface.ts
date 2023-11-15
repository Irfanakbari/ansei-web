interface RawData {
    index: number;
    date: any; // Assuming date is a string in the format 'DD/MM/YYYY'
    vendorCode: string;
    vendorName: string;
    receivingArea: string;
    deliveryDate: any; // Assuming deliveryDate is a string in the format 'DD/MM/YYYY'
    deliveryPeriod: number;
    firm: string;
    classification: string;
    poNumber: string;
    item: number;
    partsNumber: string;
    partsName: string;
    orderQuantity: number;
}