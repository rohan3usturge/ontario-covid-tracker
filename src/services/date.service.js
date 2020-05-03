import moment from "moment";

export const dates = () => {
  const today = moment.utc();
  const yesterday = moment.utc().add(-1, "d");
  const lastWeek = moment.utc().add(-1, "w");
  const lastMonth = moment.utc().add(-1, "M");
  const lastYear = moment.utc().add(-1, "y");
  return {
    today: {
      start: today.startOf("d"),
      end: today.endOf("d"),
    },
    yesterday: {
      start: yesterday.startOf("d"),
      end: yesterday.endOf("d"),
    },
    lastWeek: {
      start: lastWeek.startOf("d"),
      end: today.endOf("d"),
    },
    lastMonth: {
      start: lastMonth.startOf("d"),
      end: today.endOf("d"),
    },
    lastYear: {
      start: lastYear.startOf("d"),
      end: today.endOf("d"),
    },
  };
};
