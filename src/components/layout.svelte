<script>
  import Home from "./home.svelte";
  import About from "./about.svelte";
  import Search from "./search.svelte";
  import DataSource from "./datasource.svelte";

  let currentComoonent = "home";
  const displayComponent = component => {
    currentComoonent = component;
  };
</script>

<header>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      class="navbar-brand"
      on:click|preventDefault={() => displayComponent('home')}>
      Covid19 Info
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            class="nav-link"
            on:click|preventDefault={() => displayComponent('home')}>
            Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            class="nav-link"
            on:click|preventDefault={() => displayComponent('search')}>
            Search
          </a>
        </li>
        <li class="nav-item">
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            class="nav-link"
            on:click|preventDefault={() => displayComponent('aboutus')}>
            About us
          </a>
        </li>
        <li class="nav-item">
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            class="nav-link"
            on:click|preventDefault={() => displayComponent('datasource')}>
            Datasource
          </a>
        </li>
      </ul>
    </div>
  </nav>
</header>

<main>
  <div class="container-fluid">

    {#if currentComoonent === 'home'}
      <Home />
    {/if}
    {#if currentComoonent === 'aboutus'}
      <About />
    {/if}
    {#if currentComoonent === 'search'}
      <Search />
    {/if}
    {#if currentComoonent === 'datasource'}
      <DataSource />
    {/if}
  </div>
</main>
