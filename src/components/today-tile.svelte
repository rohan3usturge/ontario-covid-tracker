<script>
  export let todaysData;
  import HRN from "human-readable-numbers";
  import moment from "moment";
  import NumberTile from "./number-detail.svelte";
  import { link } from "svelte-routing";
</script>

<div class="card text-white bg-primary">
  <div class="card-body">
    <div class="card-title">
      <h5>In Ontario</h5>
      <h6>
        <small>As of</small>
        <em>today ({moment().format('dddd, MMMM Do YYYY')})</em>
      </h6>
    </div>
    <hr />
    <div class="mt-3" />
    <div class="row">
      <div class="col-sm">
        <NumberTile
          name="people tested"
          count={todaysData.approvedForTesting} />
      </div>
      <div class="col-sm">
        <NumberTile name="tested positive" count={todaysData.totalCases} />
      </div>
      <div class="col-sm">
        <NumberTile name="deaths" count={todaysData.deaths} />
      </div>
      <div class="col-sm">
        <NumberTile
          name="active patients"
          count={todaysData.confirmedPositive} />
      </div>
      <div class="col-sm">
        <NumberTile
          name="hospitalized patients"
          count={todaysData.hospitalized} />
      </div>
      <div class="col-sm">
        <NumberTile name="patients in ICU" count={todaysData.icu} />
      </div>
      <div class="col-sm">
        <NumberTile
          name="patients in ICU With Ventilator"
          count={todaysData.icuWithVentilator} />
      </div>
    </div>
    <div class="mt-5" />
    <a href="/search" use:link class="btn text-white border-white">
      City-wise Search
    </a>
  </div>
</div>
