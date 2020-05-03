<script>
  import SvelteFC from "svelte-fusioncharts";
  import { formatValue, getChartType } from "../config";
  export let id;
  export let name;
  export let value;
  const dataSource = value => ({
    chart: {
      xAxisName: `${name}`,
      yAxisName: "Count",
      theme: "fusion",
      showLegend: "1",
      showPercentValues: "1",
      legendPosition: "bottom",
      useDataPlotColorForLabels: "1",
      enablemultislicing: "0"
    },
    data: value.map(v => ({
      label: formatValue(id, v.value),
      value: v.count
    }))
  });

  const chartConfigs = value => ({
    id: name,
    type: getChartType(id),
    width: 300,
    height: 300,
    dataFormat: "json",
    dataSource: dataSource(value)
  });
</script>

<div class="card">
  <div class="card-body">
    <div class="card-title">{name}</div>
    <SvelteFC {...chartConfigs(value)} />
  </div>
</div>
