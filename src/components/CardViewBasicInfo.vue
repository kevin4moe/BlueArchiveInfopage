<template>
  <section class="flex flex-row flex-wrap">
    <main
      class="inline-flex flex-col w-auto h-auto m-2 p-2 border rounded-md bg-white shadow"
    >
      <h1 class="flex-grow inline-block text-center align-middle font-bold">
        {{ student.name }}
      </h1>
      <div>
        <img
          class="lazyload w-full h-auto"
          :src="require(`@/assets/students/icons/${student.name}.jpg`)"
          alt=""
        />
        <div class="flex flex-row justify-center">
          <tag-icon :count="student.rarity" path="star" name="rarity" />
        </div>
        <div class="flex flex-row justify-around">
          <div v-for="(location, n) in locations" :key="n">
            <tag-icon :path="`location_${location}`" name="location" />
            <tag-icon :path="moodLocation(student[location])" name="mood" />
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import TagIcon from "@/components/TagIcon.vue";

export default {
  props: {
    student: Object,
  },
  components: {
    TagIcon,
  },
  setup() {
    const locations = ["urban", "outdoors", "indoors"];

    function moodLocation(mood) {
      const path = `mood_${mood.toLowerCase()}`;
      return path;
    }

    return {
      locations,
      moodLocation,
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
