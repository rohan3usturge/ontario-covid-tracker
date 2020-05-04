<script>
  import Layout from "./layout.svelte";
  import FusionCharts from "fusioncharts";
  import Charts from "fusioncharts/fusioncharts.charts";
  import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
  import { fcRoot } from "svelte-fusioncharts";
  fcRoot(FusionCharts, Charts, FusionTheme);
</script>

<div class="container p-1">
  <Layout />
</div>
