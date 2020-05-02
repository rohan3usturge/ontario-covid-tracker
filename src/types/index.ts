export type OnDataApiResponse = {
  result: {
    records: OnDataApiRecord[];
  };
};

export type OnDataApiRecord = {
  _id: number;
  Row_ID: number;
  Accurate_Episode_Date: Date;
  Age_Group: string;
  Client_Gender: string;
  Case_AcquisitionInfo: string;
  Outcome1: string;
  Reporting_PHU: string;
  Reporting_PHU_Address: string;
  Reporting_PHU_City: string;
  Reporting_PHU_Postal_Code: string;
  Reporting_PHU_Website: string;
  Reporting_PHU_Latitude: number;
  Reporting_PHU_Longitude: number;
};

export type OnSearchApiRecord = {
  id: string;
  Row_ID: number;
  Accurate_Episode_Date: Date;
  Age_Group: string;
  Client_Gender: string;
  Case_AcquisitionInfo: string;
  Outcome1: string;
  Reporting_PHU: string;
  Reporting_PHU_Address: string;
  Reporting_PHU_City: string;
  Reporting_PHU_Postal_Code: string;
  Reporting_PHU_Website: string;
  Reporting_PHU_Cordinates: string;
};

export interface DocumentRequest extends OnSearchApiRecord {
  "@search.action": string;
}

export type IndexDocumentRequest = {
  value: DocumentRequest[];
};

export type DocumentResponse = {
  key: string;
  status: string;
  statusCode: number;
  errorMessage: string;
};

export type IndexDocumentResponse = {
  value: DocumentResponse[];
};
