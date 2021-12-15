<template>
  <section class="flex flex-row flex-wrap">
    <main
      :class="`inline-flex flex-col w-auto h-auto m-2 p-2 border rounded-md shadow bg-gradient-to-r from-${colors[student.attack_type]} to-${colors[student.armor_type]}`"
    >
      <div>
        <img class="lazyload w-full h-auto rounded-lg" :src="require(`@/assets/students/icons/${student.name}.jpg`)" alt="">
      </div>
    </main>
  </section>
</template>

<script>
export default {
  props: {
    student: Object,
  },
  setup() {
    const colors = {
      "Penetration": "yellow-400",
      "Explosive": "red-400",
      "Mystic": "blue-400",
      "Heavy": "yellow-700",
      "Light": "red-700",
      "Special": "blue-700"
    }

    return {
      colors
    }
  },
}
</script>

<style scoped>
h1 {
  width: 101px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>