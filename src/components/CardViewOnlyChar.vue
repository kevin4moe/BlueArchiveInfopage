<template>
  <section class="flex flex-row flex-wrap">
    <main
      :class="`inline-flex flex-col w-auto h-auto m-2 p-2 border rounded-md shadow bg-gradient-to-r ${
        colors[student.attackType]
      } ${colors[student.armorType]}`"
    >
      <div class="relative">
        <img
          class="lazyload w-full h-auto rounded-lg"
          :src="require(`@/assets/students/icons/${student.name}.jpg`)"
          :alt="student.name"
        />
        <p
          v-show="this.$store.state.useCover"
          class="absolute inset-x-0 bottom-0 text-center bg-black opacity-70 text-white font-bold"
        >
          <span>
            {{ student.useCover }}
          </span>
        </p>
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
      Penetration: "from-yellow-400",
      Explosive: "from-red-400",
      Mystic: "from-blue-400",
      Heavy: "to-yellow-700",
      Light: "to-red-700",
      Special: "to-blue-700",
    };

    return {
      colors,
    };
  },
};
</script>

<style scoped>
h1 {
  width: 101px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
