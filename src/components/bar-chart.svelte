<script>
  import SvelteFC from "svelte-fusioncharts";
  export let name;
  export let value;
  const dataSource = value => ({
    chart: {
      xAxisName: `${name}`,
      yAxisName: "Count",
      theme: "fusion"
    },
    data: value.map(v => ({
      label: v.value,
      value: v.count
    }))
  });

  const chartConfigs = value => ({
    id: name,
    type: "column2d",
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
