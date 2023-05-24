<template>
  <div id="app">
    <nav>
      <router-link class="nav-link" to="/">Video List</router-link>
      <router-link class="nav-link" to="/upload">Upload Video</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: #e6f7ff;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav {
  width: 100%;
  background-color: #1890ff;
  color: white;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin: 0 15px;
  font-size: 1.2em;
}

.nav-link:hover {
  color: #40a9ff;
}
</style>