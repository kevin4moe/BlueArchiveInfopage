<template>
  <main class="flex flex-wrap bg-blue-100">
    <div 
      v-for="(student, n) in students"
      class="w-full sm:w-1/2 lg:w-1/3"
      :key="n"
    >
      <card-view-complete :student="student" />
    </div>
  </main>
</template>

<script>
import students from '@/assets/json/students.json'
import CardViewComplete from "@/components/CardViewComplete.vue";

export default {
  components: {
    CardViewComplete,
  },
  setup() {

     return {
       students,
     }
  }
}
</script>