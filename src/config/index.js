import moment from "moment";

const displayNameConfig = [
  { id: "Age_Group", displayName: "Age Group" },
  { id: "Client_Gender", displayName: "Gender" },
  { id: "Reporting_PHU_City", displayName: "City" },
  { id: "Outcome1", displayName: "Outcome" },
  { id: "Accurate_Episode_Date", displayName: "Daily Cases" },
];

export const displayName = (id) => {
  const config = displayNameConfig.find((d) => d.id === id);
  return config && config.displayName;
};

export const formatValue = (id, value) => {
  if (id === "Accurate_Episode_Date") {
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
  switch (id) {
    case "Accurate_Episode_Date":
      return "line";
    default:
      return "column2d";
  }
};
