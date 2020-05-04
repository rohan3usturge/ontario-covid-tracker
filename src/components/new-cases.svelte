<script>
  export let count;
  export let title;
  export let badgeStyle;
</script>

<h4>
  <span class="w-25 badge badge-{badgeStyle || 'primary'}">{count}</span>
  <small class="text-muted">
    <em>{title}</em>
  </small>
</h4>
