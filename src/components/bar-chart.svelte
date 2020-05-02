<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  var data = [30, 86, 168, 281, 303, 365];

  let el;

  onMount(() => {
    d3.select(el)
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .classed("chart", true)
      .style("height", function(d) {
        return d + "px";
      })
      .style("width", "50px")
      .text(function(d) {
        return d;
      });
  });
</script>

<style>
  .chart-container {
    flex-direction: row;
    display: flex;
    align-items: flex-end;
  }
</style>

<div class="card">
  <div bind:this={el} class="chart-container" />
</div>
