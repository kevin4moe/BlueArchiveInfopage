<template>
  <main class="flex flex-col min-h-screen bg-blue-100">
    <section class="flex justify-center flex-wrap mt-2 mx-2 rounded bg-white shadow">
      <select 
        v-for="(filter, name) in allFilters"
        :name="name"
        class="my-px mx-1 rounded"
        :key="name"
      >
        <option
          v-for="(item, index) in filter"
          :value="item"
          @click="sf.addTags(name, item)"
          :key="index"
        >
          {{ item }}
        </option>
      </select>
      <button @click="newStudentsGroup">Search</button>
    </section>
    <section class="flex flex-wrap">
      <div 
        v-for="student in studentGroupIndex"
        class="w-full sm:w-1/2 md:w-1/3"
        :key="students[student].name"
      >
        <card-view-complete :student="students[student]" />
      </div>
      <div v-if="studentGroupIndex.length < 74" class="w-full">
        <p class="my-4 text-center"><button class="py-2 px-4 rounded bg-white" @click="getAllStudents">See all</button></p>
      </div>
    </section>
  </main>
</template>

<script>
import students from '@/assets/json/students.json'
import CardViewComplete from "@/components/CardViewComplete.vue";
import { ref, reactive } from "vue";
import StudentFilter from "@/assets/js/student-filter.js";

export default {
  components: {
    CardViewComplete,
  },
  setup() {
    const allFilters = {
      combat_class: ["Combat Class", "Striker", "Special"],
      rarity: ["Rarity", 1, 2, 3],
      school: ["Academy","Abydos","Trinity","Gehenna","Millennium","Red Winter","Valkyrie","Hyakkiyako","Shanhaijing"],
      role: ["Role","Attacker","Supporter","Tank","Healer"],
      position: ["Position","Front","Middle","Back"],
      attack_type: ["ATK", "Penetration", "Explosive", "Mystic"],
      armor_type: ["DEF", "Heavy", "Light", "Special"],
      weapon_type: ["Weapon","HG","SMG","AR","SR","SG","MG","GL","RG","RF","RL","DualSMG","DualMG","MountMG"],
      use_cover: ["Use cover?", true, false],
      urban: ["Urban", "S", "A", "B", "C", "D"],
      outdoors: ["Outdoors", "S", "A", "B", "C", "D"],
      indoors: ["Indoors", "S", "A", "B", "C", "D"],
    };

    let studentGroupIndex = ref([...Array(15).keys()]);
    function getAllStudents() {
      studentGroupIndex.value = [...Array(students.length).keys()]
    }
    let sf = reactive(new StudentFilter);
    function newStudentsGroup() {
      studentGroupIndex.value = sf.getStudentsByTags(students);
    }

    return {
      students,
      allFilters,
      studentGroupIndex,
      sf,
      getAllStudents,
      newStudentsGroup
    }
  },
}
</script>