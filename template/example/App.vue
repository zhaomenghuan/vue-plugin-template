<template>
  <div id="app">
    <h1>\{{ name }}</h1>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      name: "",
      version: ""
    };
  },
  mounted() {
    this.name = window.plugin.name;
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

h1 {
  width: 100%;
  height: 100%;
  line-height: 100%;
  text-align: center;
  font-size: 20px;
}
</style>