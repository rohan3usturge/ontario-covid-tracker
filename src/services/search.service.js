import axios from "axios";
import { dates } from "./date.service";

const serviceName = covidTrackerConfig.serviceName;
const indexName = covidTrackerConfig.indexName;
const apiKey = covidTrackerConfig.apiKey;
const apiVersion = covidTrackerConfig.apiVersion;

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
