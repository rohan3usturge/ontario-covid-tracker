import axios from "axios";
import { dates } from "./date.service";
import jsonp from "jsonp";

const serviceName = covidTrackerConfig.serviceName;
const indexName = covidTrackerConfig.indexName;
const apiKey = covidTrackerConfig.apiKey;
const apiVersion = covidTrackerConfig.apiVersion;

const dateWiseDataUrl = `https://data.ontario.ca/api/3/action/datastore_search`;
const searchBaseUrl = `https://${serviceName}.search.windows.net/indexes/${indexName}/docs/search`;

export const getFacets = async ({ facets = [], filters = {} }) => {
  const { Accurate_Episode_Date, Reporting_PHU_City } = filters;
  const dateRanges = dates();
  let dateRange = dateRanges.lastYear;
  if (Accurate_Episode_Date === "yesterday") {
    dateRange = dateRanges.yesterday;
  }
  if (Accurate_Episode_Date === "lastWeek") {
    dateRange = dateRanges.lastWeek;
  }
  if (Accurate_Episode_Date === "lastMonth") {
    dateRange = dateRanges.lastMonth;
  }

  const minDate = dateRange.start.toISOString();
  const maxDate = dateRange.end.toISOString();
  const filterStrings = [];
  const accurateEpisodeDateFilter = `( Accurate_Episode_Date ge ${minDate} and Accurate_Episode_Date le ${maxDate} )`;
  filterStrings.push(accurateEpisodeDateFilter);
  if (Reporting_PHU_City && Reporting_PHU_City != "All") {
    filterStrings.push(`( Reporting_PHU_City eq '${Reporting_PHU_City}' )`);
  }

  const searchPayload = {
    facets,
    top: 0,
    search: "*",
    filter: filterStrings.join(" and "),
  };

  const axiosResponse = await axios.post(searchBaseUrl, searchPayload, {
    params: {
      "api-version": apiVersion,
    },
    headers: {
      "api-key": apiKey,
    },
  });

  const returnedFacets = axiosResponse.data["@search.facets"];
  const facetArray = [];
  for (const key in returnedFacets) {
    if (returnedFacets.hasOwnProperty(key)) {
      const element = returnedFacets[key];
      facetArray.push({
        name: key,
        value: element,
      });
    }
  }

  return facetArray;
};

export const getDailyData = async () => {
  const params = {
    resource_id: "ed270bb8-340b-41f9-a7c6-e8ef587e6d11",
    limit: 500,
  };
  return new Promise((resolve, reject) => {
    const callback = (err, data) => {
      if (err) {
        reject(err);
      } else {
        const mappedData = data.result.records.map((r) => ({
          confirmedNegative: r["Confirmed Negative"],
          confirmedPositive: r["Confirmed Positive"],
          deaths: r["Deaths"],
          hospitalized: r["Number of patients hospitalized with COVID-19"],
          icuWithVentilator:
            r["Number of patients in ICU on a ventilator with COVID-19"],
          icu: r["Number of patients in ICU with COVID-19"],
          presumptiveNegative: r["Presumptive Negative"],
          presumptivePostive: r["Presumptive Positive"],
          reportedDate: r["Reported Date"],
          resolved: r["Resolved"],
          totalCases: r["Total Cases"],
          approvedForTesting:
            r["Total patients approved for testing as of Reporting Date"],
          lastDayTests: r["Total tests completed in the last day"],
          underInvestigation: r["Under Investigation"],
          id: r["_id"],
        }));
        resolve(mappedData);
      }
    };
    jsonp(
      `${dateWiseDataUrl}?resource_id=${params.resource_id}&limit=${params.limit}`,
      null,
      callback
    );
  });
};
