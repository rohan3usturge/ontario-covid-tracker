const displayNameConfig = [
  { id: "Age_Group", displayName: "Age Group" },
  { id: "Client_Gender", displayName: "Gender" },
  { id: "Reporting_PHU_City", displayName: "City" },
  { id: "Outcome1", displayName: "Outcome" },
  { id: "Accurate_Episode_Date", displayName: "Episode Date" },
];

export const displayName = (id) => {
  const config = displayNameConfig.find((d) => d.id === id);
  return config && config.displayName;
};
