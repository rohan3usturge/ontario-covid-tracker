<script>
  export let name;
  export let count;
  export let textStyle;
  export let newCount;
</script>

<div class="row font-weight-normal">
  <div class="col-6">
    <span class="dot bg-{textStyle || 'primary'}">&nbsp;</span>
    <span class="text-capitalize">{name}</span>
  </div>
  <div class="col-6">
    <span>{count.toLocaleString()}</span>
    {#if newCount}
      <span class="badge font-weight-light badge-secondary">+ {newCount}</span>
    {/if}
  </div>
</div>
