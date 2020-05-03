<script>
  import Tile from "./tile.svelte";
  import BarChart from "./bar-chart.svelte";
  import { onMount } from "svelte";
  import { getFacets } from "../services/search.service";
  import { displayName } from "../config";

  // Constants
  const facets = [
    "Age_Group,sort:value",
    "Client_Gender",
    "Reporting_PHU_City",
    "Outcome1",
    "Accurate_Episode_Date,interval:day"
  ];

  // State
  let facetArray = [];
  let outcomeCounts = [];
  let cities;
  let selectedCity = "All";
  const searchPayload = {
    facets,
    filters: {
      Accurate_Episode_Date: "overall",
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

  const getName = value => {
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
      default:
        name = "primary";
    }
    return name;
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
      name: getName(fv.value),
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

<svelte:head>
  <link rel="stylesheet" href="tutorial/dark-theme.css" />
</svelte:head>

<div>
  <div class="mt-4" />
  <div class="card">
    <div class="card-body">
      <h6>
        Showing data for Ontario
        <small class="text-muted">for following filters</small>
      </h6>
      <div class="mt-2" />
      <div class="btn-group fluid" role="group" aria-label="Basic example">
        <button
          type="button"
          class="btn btn-primary {searchPayload.filters.Accurate_Episode_Date === 'overall' ? 'active' : ''}"
          on:click={() => handleDataRangeClick('lastYear')}>
          Till today
        </button>
        <button
          type="button"
          class="btn btn-primary {searchPayload.filters.Accurate_Episode_Date === 'lastWeek' ? 'active' : ''}"
          on:click={() => handleDataRangeClick('lastWeek')}>
          Last 7 days
        </button>
        <button
          type="button"
          class="btn btn-primary {searchPayload.filters.Accurate_Episode_Date === 'lastMonth' ? 'active' : ''}"
          on:click={() => handleDataRangeClick('lastMonth')}>
          Last 1 month
        </button>
      </div>
      {#if cities}
        <div style="margin-top: 25px;" />
        <div class="form-group">
          <label for="select-city">City</label>
          <select
            bind:value={selectedCity}
            class="form-control"
            id="select-city"
            on:change={handleCityChange}>
            <option value="All">All</option>
            {#each cities as { value }}
              <option {value}>{value}</option>
            {/each}
          </select>
        </div>
      {/if}
    </div>
  </div>

  <div class="mt-4" />
  <div class="row">
    {#each outcomeCounts as { name, count, textStyle }}
      <div class="col-sm-6 col-md-4 col-lg-2">
        <Tile {name} {count} {textStyle} />
      </div>
    {/each}
  </div>
  <div class="mt-4" />
  <div class="row">
    {#each facetArray as { name, value }}
      <div class="col-sm col-md col-lg-4 mt-4">
        <BarChart name={displayName(name)} {value} />
      </div>
    {/each}
  </div>
</div>
