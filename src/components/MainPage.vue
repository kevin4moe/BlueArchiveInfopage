<template>
  <main class="flex flex-col min-h-screen bg-blue-100">
    <search-settings @addTags="addTag" @newGroup="newStudentsGroup" />
    <section class="flex flex-row flex-wrap justify-center">
      <div 
        v-for="student in studentGroupIndex"
        class="flex flex-row flex-wrap"
        :key="students[student].name"
      >
        <component :is="currentComponent" :student="students[student]" />
      </div>
      <div v-if="studentGroupIndex.length < 74" class="w-full">
        <p class="my-4 text-center"><button class="py-2 px-4 rounded bg-white" @click="getAllStudents">See all</button></p>
      </div>
    </section>
  </main>
</template>

<script>
import SearchSettings from "@/components/SearchSettings.vue";
import students from '@/assets/json/students.json'
import { ref, reactive, defineAsyncComponent, computed  } from "vue";
import StudentFilter from "@/assets/js/student-filter.js";

export default {
  components: {
    SearchSettings,
    CardViewComplete: defineAsyncComponent(() => import('@/components/CardViewComplete.vue')),
    CardViewBasicInfo: defineAsyncComponent(() => import('@/components/CardViewBasicInfo.vue')),
    CardViewOnlyChar: defineAsyncComponent(() => import('@/components/CardViewOnlyChar.vue'))
  },
  setup() {
    let studentGroupIndex = ref([...Array(15).keys()]);
    function getAllStudents() {
      studentGroupIndex.value = [...Array(students.length).keys()]
    }
    let sf = reactive(new StudentFilter);
    function newStudentsGroup() {
      studentGroupIndex.value = sf.getStudentsByTags(students);
    }

    const cards = ["Complete", "BasicInfo", "OnlyChar"];
    let currentCard = ref("OnlyChar");
    const currentComponent = computed (() =>  {
      console.info(currentCard.value)
      return "CardView" + currentCard.value;
    });
    
    function addTag(a, b) {
      sf.addTags(a, b);
    }

    return {
      students,
      studentGroupIndex,
      sf,
      cards,
      currentCard,
      currentComponent,
      getAllStudents,
      newStudentsGroup,
      addTag
    }
  },
}
</script>