import moment from "moment";

const displayNameConfig = [
  { id: "Accurate_Episode_Date", displayName: "Episode Date" },
  { id: "Age_Group", displayName: "Age Group" },
  { id: "Client_Gender", displayName: "Gender" },
  { id: "Reporting_PHU_City", displayName: "City" },
  { id: "Outcome1", displayName: "Outcome" },
  { id: "icuCasesTrendData", displayName: "ICU Cases" },
  { id: "icuCasesWithVentilatorTrendData", displayName: "Ventilator Cases" },
  { id: "hospitalizedCasesTrendData", displayName: "Hospitalized Cases" },
  { id: "totalCasesTrendData", displayName: "Total Cases" },
  { id: "testingTrendData", displayName: "Testing" },
  { id: "deathTrendData", displayName: "Deaths" },
  { id: "activeCaseTrendData", displayName: "Active Cases" },
  { id: "recoveredCasesTrendData", displayName: "Recovered Cases" },
];

export const displayName = (id) => {
  const config = displayNameConfig.find((d) => d.id === id);
  if (!config) {
    return id;
  }
  return config.displayName;
};

export const formatValue = (id, value) => {
  if (id === "Accurate_Episode_Date" || id.includes("TrendData")) {
    return moment(value).format("DD-MMM-YYYY");
  }
  if (id === "Outcome1") {
    return getOutcomeName(value);
  }
  return value;
};

export const getOutcomeName = (value) => {
  let name;
  switch (value.toLowerCase()) {
    case "fatal":
      name = "Deaths";
      break;
    case "resolved":
      name = "Recovered";
      break;
    case "not resolved":
      name = "Active";
      break;
  }
  return name;
};

export const getChartType = (id) => {
  if (id.includes("TrendData")) {
    return "line";
  }

  switch (id) {
    case "Accurate_Episode_Date":
      return "line";
    case "Outcome1":
    case "Client_Gender":
      return "pie2d";
    default:
      return "column2d";
  }
};
