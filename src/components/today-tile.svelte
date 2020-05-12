<script>
  export let todaysData;
  export let newCasesData;
  import HRN from "human-readable-numbers";
  import moment from "moment";
  import NumberTile from "./number-detail.svelte";
</script>

<div class="card">
  <div class="card-body">
    <h1 class="text-danger font-weight-light">
      {todaysData.totalCases.toLocaleString()}
      <h5 style="display: inline-block;">
        <small>+ {newCasesData.totalCases}</small>
      </h5>
    </h1>
    <div class="m-t-2" />
    <!-- <div class="card-title">
      <h5>In Ontario</h5>
      <h6>
        <small>As of</small>
        <em>today ({moment().format('dddd, MMMM Do YYYY')})</em>
      </h6>
    </div> 
    <hr />
    <div class="mt-3" />-->
    <div class="row">
      <!-- <div class="col-sm-6">
        <NumberTile
          name="Total cases"
          count={todaysData.totalCases}
          textStyle="primary"
          newCount={newCasesData.totalCases} />
      </div> -->
      <!-- <div class="col-sm-6">
        <NumberTile name="Total Tested" count={todaysData.approvedForTesting} />
      </div> -->
      <div class="col-12">
        <NumberTile
          name="Active cases"
          count={todaysData.confirmedPositive}
          textStyle="warning"
          newCount={newCasesData.totalCases} />
      </div>
      <div class="col-12">
        <NumberTile
          name="Fatal cases"
          count={todaysData.deaths}
          textStyle="danger"
          newCount={newCasesData.deaths} />
      </div>
      <div class="col-12">
        <NumberTile
          name="Recovered cases"
          count={todaysData.resolved}
          textStyle="success"
          newCount={newCasesData.resolved} />
      </div>
      <!-- <div class="col-sm-6">
        <NumberTile name="Hospitalized cases" count={todaysData.hospitalized} />
      </div>
      <div class="col-sm-6">
        <NumberTile name="ICU cases" count={todaysData.icu} />
      </div>
      <div class="col-sm-6">
        <NumberTile
          name="ICU cases with Ventilator"
          count={todaysData.icuWithVentilator} />
      </div> -->
    </div>
  </div>
</div>
