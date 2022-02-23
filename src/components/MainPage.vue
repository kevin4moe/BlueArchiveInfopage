<template>
  <main class="flex flex-col min-h-screen bg-blue-100">
    <search-settings @newGroup="newStudentsGroup" />
    <section v-if="!studentFilter.sortBy.active" class="flex flex-row flex-wrap justify-center">
      <div 
        v-for="index in studentFilter.studentsIndex.current"
        class="flex flex-row flex-wrap"
        :key="students[index].name"
      >
        <component :is="currentComponent" :student="students[index]" />
      </div>
      <div v-if="studentFilter.studentsIndex.current.length < 74" class="w-full">
        <p class="my-4 text-center"><button class="py-2 px-4 rounded bg-white" @click="getAllStudents">See all</button></p>
      </div>
    </section>
    <section 
      v-else-if="studentFilter.sortBy.active"
      class="grid grid-rows-1 gap-4 max-w-screen-lg mx-auto my-12"
    >
      <div v-show="studentFilter.sortBy.rarity[3].length > 0" class="flex flex-row">
        <div class="flex-none flex flex-col justify-center items-center w-12 h-full p-1 rounded bg-yellow-300">
          <img src="@/assets/icons/star.png" alt="star">
          <img src="@/assets/icons/star.png" alt="star">
          <img src="@/assets/icons/star.png" alt="star">
        </div>
        <div class="flex flex-row flex-wrap">
          <div 
            v-for="index in studentFilter.sortBy.rarity[3]"
            
            :key="students[index].name"
          >
            <component :is="currentComponent" :student="students[index]" />
          </div>
        </div>
      </div>
      <div v-show="studentFilter.sortBy.rarity[2].length > 0" class="flex flex-row">
        <div class="flex-none flex flex-col justify-center items-center w-12 h-full p-1 rounded bg-yellow-300">
          <img src="@/assets/icons/star.png" alt="star">
          <img src="@/assets/icons/star.png" alt="star">
        </div>
        <div class="flex flex-row flex-wrap">
          <div 
            v-for="index in studentFilter.sortBy.rarity[2]"
            class="flex flex-row flex-wrap"
            :key="students[index].name"
          >
            <component :is="currentComponent" :student="students[index]" />
          </div>
        </div>
      </div>
      <div v-show="studentFilter.sortBy.rarity[1].length > 0" class="flex flex-row">
        <div class="flex-none flex flex-col justify-center items-center w-12 h-full p-1 rounded bg-yellow-300">
          <img src="@/assets/icons/star.png" alt="star">
        </div>
        <div class="flex flex-row flex-wrap">
          <div 
            v-for="index in studentFilter.sortBy.rarity[1]"
            class="flex flex-row flex-wrap"
            :key="students[index].name"
          >
            <component :is="currentComponent" :student="students[index]" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import SearchSettings from "@/components/SearchSettings.vue";
import students from '@/assets/json/students.json'
import { ref, reactive, defineAsyncComponent, computed  } from "vue";
import { useStore } from "vuex";
import StudentFilter from "@/assets/js/student-filter2.js";

export default {
  components: {
    SearchSettings,
    CardViewComplete: defineAsyncComponent(() => import('@/components/CardViewComplete.vue')),
    CardViewBasicInfo: defineAsyncComponent(() => import('@/components/CardViewBasicInfo.vue')),
    CardViewOnlyChar: defineAsyncComponent(() => import('@/components/CardViewOnlyChar.vue'))
  },
  setup() {
    const store = useStore();

    const studentFilter = reactive(new StudentFilter);
    studentFilter.studentsIndex.all = students.length
    studentFilter.studentsIndex.current = ref([...Array(15).keys()]);
    function newStudentsGroup() {
      studentFilter.searchStudents(students, store.state);
    }
    function getAllStudents() {
      studentFilter.studentsIndex.current = [...Array(studentFilter.studentsIndex.all).keys()];
    }

    const cards = ["Complete", "BasicInfo", "OnlyChar"];
    const currentComponent = computed (() =>  {
      return "CardView" + cards[2];
    });

    return {
      students,
      studentFilter,
      currentComponent,
      getAllStudents,
      newStudentsGroup,
    }
  },
}
</script>