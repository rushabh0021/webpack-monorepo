<template>
  <div>
    <p class="bold">This is Component 1 updated</p>
    <p>My name is {{ name }}</p>
  </div>
</template>

<script>
export default {
  name: "my-component_1",
  data() {
    return {
        name: "rushabh",
    };
  },
};
</script>

<style lang="css">
    .bold {
        font-weight: 600;
    }
</style>