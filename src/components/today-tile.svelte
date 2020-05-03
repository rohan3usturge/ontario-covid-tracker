<script>
  export let todaysData;
  import HRN from "human-readable-numbers";
  import moment from "moment";
</script>

<div class="card border-primary">
  <div class="card-body">
    <div class="card-title">
      <h6>
        <small>As of</small>
        <em>today ({moment().format('dddd, MMMM Do YYYY')})</em>
      </h6>
    </div>
    <div class="mt-3" />
    <div class="row">
      <div class="col-sm">
        <h5>
          {HRN.toHumanString(todaysData.approvedForTesting)}
          <small>people tested</small>
        </h5>
      </div>
      <div class="col-sm">
        <h5>
          {HRN.toHumanString(todaysData.totalCases)}
          <small>tested positive</small>
        </h5>
      </div>
      <div class="col-sm">
        <h5>
          {HRN.toHumanString(todaysData.deaths)}
          <small>deaths</small>
        </h5>
      </div>
      <div class="col-sm">
        <h5>
          {HRN.toHumanString(todaysData.confirmedPositive)}
          <small>active patients</small>
        </h5>
      </div>

      <div class="col-sm">
        <h5>
          {todaysData.hospitalized}
          <small>hospitalized patients</small>
        </h5>
      </div>
      <div class="col-sm">
        <h5>
          {todaysData.icu}
          <small>patients in ICU</small>
        </h5>
      </div>
      <div class="col-sm">
        <h5>
          {todaysData.icuWithVentilator}
          <small>patients in ICU With Ventilator</small>
        </h5>
      </div>
    </div>

  </div>
</div>
