<script>
  export let name;
  export let count;
  export let textStyle;
  import HRN from "human-readable-numbers";
</script>

<h5 class="text={textStyle}">
  {HRN.toHumanString(count)}
  <small class="text-muted">{name}</small>
</h5>
