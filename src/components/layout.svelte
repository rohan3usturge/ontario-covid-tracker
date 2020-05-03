<script>
  import Home from "./home.svelte";
  import About from "./about.svelte";
  import Search from "./search.svelte";
  import DataSource from "./datasource.svelte";
  import { Router, Link, Route, link } from "svelte-routing";
  export let url = "/";
</script>

<Router {url}>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand mb-0 h1" href="/" use:link>Ontario Covid19 Info</a>
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
        <li
          class="nav-item {url === '/' ? 'active' : ''}"
          on:click={() => (url = '/')}>
          <a class="nav-link" href="/" use:link>Home</a>
        </li>
        <li
          class="nav-item {url === '/search' ? 'active' : ''}"
          on:click={() => (url = '/search')}>
          <a class="nav-link" href="/search" use:link>Search</a>
        </li>
        <li
          class="nav-item {url === '/about' ? 'active' : ''}"
          on:click={() => (url = '/about')}>
          <a class="nav-link" href="/about" use:link>About Us</a>
        </li>
        <li
          class="nav-item {url === '/datasource' ? 'active' : ''}"
          on:click={() => (url = '/datasource')}>
          <a class="nav-link" href="/datasource" use:link>Datasource</a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="alert alert-primary mt-1" role="alert">
    Website Currenly shows only ONTARIO Provice data. More is coming soon.
  </div>
  <div>
    <Route path="datasource" component={DataSource} />
    <Route path="search" component={Search} />
    <Route path="about" component={About} />
    <Route path="/">
      <Home />
    </Route>
  </div>
</Router>
