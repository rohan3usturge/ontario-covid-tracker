import { config } from "dotenv";
config();
import axios from "axios";
import { green, red, white } from "colors/safe";
import {
  OnDataApiRecord,
  OnDataApiResponse,
  IndexDocumentRequest,
  IndexDocumentResponse,
  DocumentRequest,
} from "../types";

declare const console: any;

console.logCopy = console.log.bind(console);

console.info = function (data: any) {
  var currentDate = "[" + new Date().toUTCString() + "] ";
  this.logCopy(white(currentDate), data ?? "");
};

const {
  dataApiBaseUrl,
  resourceId,
  limit,
  serviceName,
  indexName,
  apiKey,
  apiVersion,
} = process.env;

const indexBaseUrl = `https://${serviceName}.search.windows.net/indexes/${indexName}/docs/index`;

const getOntarioData = async (): Promise<OnDataApiRecord[]> => {
  try {
    console.info(green(`START getOntarioData`));
    console.info();
    console.info(green(`PARAMS`));
    console.info(green(`dataApiBaseUrl = ${dataApiBaseUrl}`));
    console.info(green(`limit = ${limit}`));
    console.info(green(`resourceId = ${resourceId}`));
    console.info();
    console.info();

    if (!dataApiBaseUrl) {
      throw new Error();
    }

    const response = await axios.get<OnDataApiResponse>(dataApiBaseUrl, {
      params: {
        resource_id: resourceId,
        limit,
      },
    });
    console.info(green(`Data Successfully Recieved from Ontario Data Api`));
    const { records } = response.data.result;
    console.info(green(`Data Count  ${records.length} `));
    return records;
  } catch (error) {
    const errMessage = JSON.stringify(error.response.data);
    console.info(red(`Data Api call failed  ${errMessage} `));
    throw error;
  } finally {
    console.info(green(`END getOntarioData`));
    console.info();
    console.info();
  }
};

const indexOntarioData = async (records: OnDataApiRecord[]): Promise<void> => {
  try {
    console.info(green(`START indexOntarioData`));
    console.info();
    console.info(green(`PARAMS`));
    console.info(green(`apiVersion = ${apiVersion}`));
    console.info(green(`indexBaseUrl = ${indexBaseUrl}`));
    console.info();
    console.info();

    const indexDocuments: DocumentRequest[] = records.map((r) => ({
      id: r._id.toString(),
      Age_Group: r.Age_Group,
      Case_AcquisitionInfo: r.Case_AcquisitionInfo,
      Client_Gender: r.Client_Gender,
      Outcome1: r.Outcome1,
      Reporting_PHU: r.Reporting_PHU,
      Reporting_PHU_Address: r.Reporting_PHU_Address,
      Reporting_PHU_City: r.Reporting_PHU_City,
      Reporting_PHU_Postal_Code: r.Reporting_PHU_Postal_Code,
      Reporting_PHU_Website: r.Reporting_PHU_Website,
      Row_ID: r.Row_ID,
      Accurate_Episode_Date: new Date(r.Accurate_Episode_Date),
      Reporting_PHU_Cordinates: null, //`geography'POINT(${r.Reporting_PHU_Longitude} ${r.Reporting_PHU_Latitude})'`,
      "@search.action": "mergeOrUpload",
    }));

    const indexDocumentRequest: IndexDocumentRequest = {
      value: indexDocuments,
    };

    await axios.post<IndexDocumentResponse>(
      indexBaseUrl,
      indexDocumentRequest,
      {
        params: {
          "api-version": apiVersion,
        },
        headers: {
          "api-key": apiKey,
        },
      }
    );
    console.info(green(`Indexed Successfully`));
  } catch (error) {
    const errMessage = JSON.stringify(error.response);
    console.info(red(`Indexing Api call failed  ${errMessage} `));
    throw error;
  } finally {
    console.info(green(`END indexOntarioData`));
    console.info();
    console.info();
  }
};

const main = async () => {
  console.info(green(`Starting Indexer Job`));
  const records = await getOntarioData();
  await indexOntarioData(records);
};

(async () => {
  await main();
})();
