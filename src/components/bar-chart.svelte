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
    colorrange: {
      minvalue: "0",
      code: "#FFE0B2",
      gradient: "1",
      color: [
        { minvalue: "0.5", maxvalue: "1.0", color: "#FFD74D" },
        { minvalue: "1.0", maxvalue: "2.0", color: "#FB8C00" },
        { minvalue: "2.0", maxvalue: "3.0", color: "#E65100" }
      ]
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
