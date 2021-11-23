<template>
  <section class="w-full flex flex-wrap">
    <body class="w-full m-2 p-2 border rounded-md bg-white shadow ">
      <div class="w-1/3 h-auto float-right">
        <h1 class="text-center text-lg font-extrabold">{{ student.name }}</h1>
        <img class="lazyload w-full h-auto" :src="require(`@/assets/students/icons/${student.name}.jpg`)" alt="">
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
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-y-4 gap-x-px">
        <tag-card title="School" :content="student.school" />
        <tag-card title="Role" :content="student.role" />
        <tag-card title="Position" :content="student.position" />
        <tag-card title="Attack type" :content="student.attack_type" />
        <tag-card title="Armor type" :content="student.armor_type" />
        <tag-card title="Combat class" :content="student.combat_class" />
        <tag-card title="Weapon type" :content="student.weapon_type" />
        <tag-card title="User cover?" :content="ifIsUserCover(student.user_cover)" />
        <tag-card title="JP release date" :content="student.release_date_jp" />
        <tag-card title="Global release date" :content="student.release_date_global" />
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
  data: function () {
    return {
      locations: ["urban", "outdoors", "indoors"],
    }
  },
  components: {
    TagCard,
    TagIcon,
  },
  methods: {
    moodLocation(mood){
      const path = `mood_${mood.toLowerCase()}`
      return path;
    },
    ifIsUserCover(isUC) {
      const is = (isUC)?"Yes":"No";
      return is;
    }
  }
}
</script>