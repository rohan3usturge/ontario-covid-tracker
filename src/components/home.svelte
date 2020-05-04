<script>
  gtag("event", "screen_view", {
    app_name: "Covid-Info",
    screen_name: "Home"
  });
  import TodayTile from "./today-tile.svelte";
  import NewCase from "./new-cases.svelte";
  import Chart from "./chart.svelte";
  import { onMount } from "svelte";
  import moment from "moment";
  import { getDailyData } from "../services/search.service";
  import { displayName } from "../config";

  // State
  let todaysData;
  let dailyData = [];
  let trends = [];
  let yesterdaysData;

  // functions

  const getDataForDay = (dailyD, day) => {
    return dailyD.find(d => {
      const reportingDateStr = d.reportedDate;
      const reportingDate = moment(reportingDateStr);
      return (
        day.isSame(reportingDate, "day") &&
        day.isSame(reportingDate, "month") &&
        day.isSame(reportingDate, "year")
      );
    });
  };

  const searchAndSetDailyData = async () => {
    dailyData = await getDailyData();
    const today = moment()
      .utc()
      .startOf("day");
    todaysData = getDataForDay(dailyData, today);
    let dayMinus = -1;
    if (!todaysData) {
      todaysData = getDataForDay(dailyData, today.add(-1, "day"));
      dayMinus = -2;
    }
    const yesterday = moment()
      .utc()
      .add(dayMinus, "day")
      .startOf("day");
    yesterdaysData = getDataForDay(dailyData, yesterday);

    const totalCasesTrendData = dailyData.map(d => ({
      value: d.reportedDate,
      count: d.totalCases || 0
    }));

    const activeCaseTrendData = dailyData.map(d => ({
      value: d.reportedDate,
      count: d.confirmedPositive || 0
    }));

    const testingTrendData = dailyData.map(d => ({
      value: d.reportedDate,
      count: d.approvedForTesting || 0
    }));

    const deathTrendData = dailyData.map(d => ({
      value: d.reportedDate,
      count: d.deaths || 0
    }));

    const hospitalizedCasesTrendData = dailyData.map(d => ({
      value: d.reportedDate,
      count: d.hospitalized || 0
    }));
    const icuCasesTrendData = dailyData.map(d => ({
      value: d.reportedDate,
      count: d.icu || 0
    }));

    const icuCasesWithVentilatorTrendData = dailyData.map(d => ({
      value: d.reportedDate,
      count: d.icuWithVentilator || 0
    }));

    const recoveredCasesTrendData = dailyData.map(d => ({
      value: d.reportedDate,
      count: d.resolved || 0
    }));

    trends = [];

    trends.push({
      name: "totalCasesTrendData",
      value: totalCasesTrendData
    });

    trends.push({
      name: "deathTrendData",
      value: deathTrendData
    });

    trends.push({
      name: "activeCaseTrendData",
      value: activeCaseTrendData
    });

    trends.push({
      name: "recoveredCasesTrendData",
      value: recoveredCasesTrendData
    });

    trends.push({
      name: "hospitalizedCasesTrendData",
      value: hospitalizedCasesTrendData
    });

    trends.push({
      name: "icuCasesTrendData",
      value: icuCasesTrendData
    });

    trends.push({
      name: "icuCasesWithVentilatorTrendData",
      value: icuCasesWithVentilatorTrendData
    });

    trends.push({
      name: "testingTrendData",
      value: testingTrendData
    });
  };

  // lifecycle methods
  onMount(async () => {
    await searchAndSetDailyData();
  });
</script>

<div>

  <div class="mt-2" />
  <div class="alert alert-primary" role="alert">
    Data refreshes everyday around 10.30 EST.
  </div>

  {#if todaysData && yesterdaysData}
    <div class="mt-2" />
    <div class="card border-primary">
      <div class="card-body">
        <div class="row">
          <div class="col-sm-4">
            <NewCase
              count={todaysData.totalCases - yesterdaysData.totalCases}
              title="New Cases" />
          </div>
          <div class="col-sm-4">
            <NewCase
              count={todaysData.deaths - yesterdaysData.deaths}
              title="New Deaths"
              badgeStyle="danger" />
          </div>
          <div class="col-sm-4">
            <NewCase
              count={todaysData.resolved - yesterdaysData.resolved}
              title="New Recoveries"
              badgeStyle="success" />
          </div>
        </div>
      </div>
    </div>
  {/if}

  <div class="mt-2" />
  {#if todaysData}
    <TodayTile {todaysData} />
  {/if}

  {#if trends}
    <div class="mt-2" />
    <div class="card">
      <div class="card-body">
        <div class="card-title">
          <h5>Daily Trends</h5>
          <h6 class="text-muted">
            <small>As of</small>
            <em>today ({moment().format('dddd, MMMM Do YYYY')})</em>
          </h6>
        </div>
        <div class="row">
          {#each trends as { name, value }}
            <div class="col-sm m-1 p-0">
              <Chart id={name} name={displayName(name)} {value} />
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

</div>
