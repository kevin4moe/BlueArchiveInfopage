<template>
  <section>
    <body class="w-full m-2 p-2 border rounded-md bg-white shadow">
      <div class="w-1/3 h-auto float-right">
        <h1 class="text-center text-lg font-extrabold">{{ student.name }}</h1>
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
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-y-4 gap-x-px"
      >
        <tag-card
          v-for="(desc, title) in rowDataStudent"
          :title="desc"
          :content="student[title]"
          :key="title"
        />
      </div>
    </body>
  </section>
</template>

<script>
import TagCard from "@/components/TagCard.vue";
import TagIcon from "@/components/TagIcon.vue";

export default {
  props: {
    student: Object,
  },
  components: {
    TagCard,
    TagIcon,
  },
  setup() {
    const rowDataStudent = {
      school: "School",
      role: "Role",
      position: "Position",
      attack_type: "Attack type",
      armor_type: "Armor type",
      combat_class: "Combat class",
      weapon_type: "Weapon type",
      use_cover: "Use cover?",
      release_date_jp: "JP release date",
      release_date_global: "Global release date",
    };
    const locations = ["urban", "outdoors", "indoors"];

    function moodLocation(mood) {
      const path = `mood_${mood.toLowerCase()}`;
      return path;
    }
    function ifIsUserCover(isUC) {
      const is = isUC ? "Yes" : "No";
      return is;
    }

    return {
      rowDataStudent,
      locations,
      moodLocation,
      ifIsUserCover,
    };
  },
};
</script>
