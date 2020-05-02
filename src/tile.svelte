<script>
  export let name;
  export let count;
  export let textStyle;
</script>

<div>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title text-uppercase text-{textStyle}">{name}</h5>
      <h3 class="card-text">{count}</h3>
    </div>
  </div>
</div>
