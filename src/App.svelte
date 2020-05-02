<script>
  import Tile from "./tile.svelte";
  import BarChart from "./bar-chart.svelte";
  const data = [
    {
      name: "Total Cases",
      count: 2000,
      textStyle: "info"
    },
    {
      name: "New Cases",
      count: 2000,
      textStyle: "warning"
    },
    {
      name: "Deaths",
      count: 2000,
      textStyle: "danger"
    },
    {
      name: "Recovered",
      count: 2000,
      textStyle: "success"
    }
  ];
</script>

<main>
  <div class="container-fluid">
    <h5 class="text-uppercase">
      Ontario
      <small>
        <em>Covid Tracker</em>
      </small>
    </h5>
    <div style="margin-top: 25px;" />
    <div class="row">
      {#each data as { name, count, textStyle }}
        <div class="col-sm-6 col-md-4 col-lg-2">
          <Tile {name} {count} {textStyle} />
        </div>
      {/each}
    </div>
    <div style="margin-top: 25px;" />
    <BarChart />
  </div>
</main>
