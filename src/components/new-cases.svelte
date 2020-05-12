<script>
  export let count;
  export let title;
  export let newCount;
  export let badgeStyle;
</script>

<div class="row">
  <div class="col-6">
    <span class="dot bg-{badgeStyle || 'primary'}">&nbsp;</span>
    <span class="text-capitalize">{title}</span>
  </div>
  <div class="col-6">
    <span>{count}</span>
    <span class="badge badge-secondary">+ {count}</span>
  </div>
</div>
