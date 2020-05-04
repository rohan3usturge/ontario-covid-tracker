<script>
  export let name;
  export let count;
  export let textStyle;

  const numberWithCommas = x => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };
</script>

<h5 class="text={textStyle}">
  {count.toLocaleString()}
  <small>{`   ${name}`}</small>
</h5>
