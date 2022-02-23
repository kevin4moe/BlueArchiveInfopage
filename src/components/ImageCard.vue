<template>
  <img
    class="w-full h-auto"
    :src="require(`@/assets/students/icons/${student.name}.jpg`)"
    alt=""
  />
</template>

<script>
export default {
  props: {
    student: Object,
  },
};
</script>
