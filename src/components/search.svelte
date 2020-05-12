<script>
  gtag("event", "screen_view", {
    app_name: "Covid-Info",
    screen_name: "Search"
  });
  import NumberDetail from "./number-detail.svelte";
  import Chart from "./chart.svelte";
  import { onMount } from "svelte";
  import moment from "moment";
  import { getFacets } from "../services/search.service";
  import { displayName, getOutcomeName } from "../config";

  // Constants
  const facets = [
    "Age_Group,sort:value",
    "Client_Gender",
    "Reporting_PHU_City",
    "Outcome1"
  ];

  // State
  let facetArray = [];
  let outcomeCounts = [];
  let todaysData;
  let dailyData = [];
  let cities;
  let selectedCity = "All";
  const searchPayload = {
    facets,
    filters: {
      Accurate_Episode_Date: "lastYear",
      Reporting_PHU_City: undefined
    }
  };

  // util functions
  const getTextStyle = value => {
    let textStyle;
    switch (value.toLowerCase()) {
      case "fatal":
        textStyle = "danger";
        break;
      case "resolved":
        textStyle = "success";
        break;
      case "not resolved":
        textStyle = "warning";
        break;
      default:
        textStyle = "primary";
    }
    return textStyle;
  };

  // functions
  const setCities = facetArray => {
    if (!cities) {
      cities = facetArray.find(f => f.name === "Reporting_PHU_City").value;
    }
  };

  const setOutcomes = facetArray => {
    const outcomeFacet = facetArray.find(f => f.name === "Outcome1");
    const outcomes = outcomeFacet.value.map(fv => ({
      name: getOutcomeName(fv.value),
      count: fv.count,
      textStyle: getTextStyle(fv.value)
    }));

    const total = outcomes.reduce((total, current) => total + current.count, 0);
    outcomeCounts = [
      {
        name: "Total",
        count: total,
        textStyle: "primary"
      },
      ...outcomes
    ];
  };

  const searchAndSetFacets = async () => {
    facetArray = await getFacets(searchPayload);
    for (const facet of facetArray) {
      if (facet.name === "Age_Group") {
        facet.value = facet.value.sort(lv =>
          lv.value.startsWith("<") ? -1 : 0
        );
      }
      facet.value = facet.value.filter(
        lv =>
          lv.value &&
          !lv.value.toLowerCase().includes("unknown") &&
          !lv.value.toLowerCase().includes("blank")
      );
    }
    setCities(facetArray);
    setOutcomes(facetArray);
  };

  // event handlers
  const handleDataRangeClick = async dateRange => {
    searchPayload.filters.Accurate_Episode_Date = dateRange;
    await searchAndSetFacets();
  };

  const handleCityChange = async () => {
    searchPayload.filters.Reporting_PHU_City = selectedCity;
    await searchAndSetFacets();
  };

  // lifecycle methods
  onMount(async () => {
    await searchAndSetFacets();
  });
</script>

<div>
  <div class="mt-2" />

  <div class="card">
    <div class="card-body p-1">
      <h6>
        <small class="text-muted">
          Apply Filters below using date and city
        </small>
      </h6>
      <div class="mt-2" />
      <div class="row">
        <div
          class="btn-group col-md-6"
          role="group"
          aria-label="Select Data range">
          <button
            type="button"
            class="btn btn-outline-primary {searchPayload.filters.Accurate_Episode_Date === 'lastYear' ? 'active' : ''}"
            on:click={() => handleDataRangeClick('lastYear')}>
            Till today
          </button>
          <button
            type="button"
            class="btn btn-outline-primary {searchPayload.filters.Accurate_Episode_Date === 'lastWeek' ? 'active' : ''}"
            on:click={() => handleDataRangeClick('lastWeek')}>
            Last 7 days
          </button>
          <button
            type="button"
            class="btn btn-outline-primary {searchPayload.filters.Accurate_Episode_Date === 'lastMonth' ? 'active' : ''}"
            on:click={() => handleDataRangeClick('lastMonth')}>
            Last 1 month
          </button>
        </div>
        {#if cities}
          <div class="col-md-6 mt-1">
            <select
              bind:value={selectedCity}
              class="form-control"
              id="select-city"
              on:change={handleCityChange}>
              <option value="All">Select a city. e.g. Toronto</option>
              {#each cities as { value }}
                <option {value}>{value}</option>
              {/each}
            </select>
          </div>
        {/if}
      </div>
      {#if outcomeCounts}
        <div class="mt-4" />
        <div class="card">
          <div class="card-body">
            {#each outcomeCounts as { name, count, textStyle }}
              <div class="col-sm-6">
                <NumberDetail {name} {count} {textStyle} />
              </div>
            {/each}
          </div>
        </div>
      {/if}
      {#if facetArray}
        <div class="mt-4" />
        <div class="row">
          {#each facetArray as { name, value }}
            <div class="col-sm">
              <div class="mt-1" />
              <Chart id={name} name={displayName(name)} {value} />
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
