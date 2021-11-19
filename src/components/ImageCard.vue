<template>
  <img class="w-full h-auto" :src="require(`@/assets/students/${student.name}.png`)" alt="">
</template>

<script>
export default {
  props: {
    student: Object,
  },
}
</script>