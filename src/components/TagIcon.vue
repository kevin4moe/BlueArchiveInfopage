<template>
  <img
    v-for="n in count"
    class="my-1"
    :src="require(`@/assets/icons/${path}.png`)"
    :alt="name"
    :key="n"
  />
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 1,
    },
    path: String,
    name: String,
  },
};
</script>
