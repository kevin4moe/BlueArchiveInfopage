<template>
  <main class="flex flex-col bg-blue-100">
    <section class="flex justify-center mt-2 mx-2 rounded bg-white shadow">
      <select 
        name="combat_class"
        id=""
      >
        <option value="Striker">Striker</option>
        <option value="Special">Special</option>
      </select>
    </section>
    <section class="flex flex-wrap">
      <div 
        v-for="(student, n) in students"
        class="w-full sm:w-1/2 lg:w-1/3"
        :key="n"
      >
        <card-view-complete :student="student" />
      </div>
    </section>
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
    let settings = {
      rarity: [1, 2, 3],
      school: ["Millennium", "Abydos"],
      role: ["Attacker", "Healer"],
      position: ["Middle", "Back"],
      attack_type: ["Explosive", "Mystic"],
      armor_type: ["Heavy", "Light"],
      combat_class: ["Striker", "Special"],
      weapon_type: ["AR", "HG"],
      use_cover: [true, false],
      urban: ["A", "B", "C", "D", "E"],
      outdoors: ["A", "B", "C", "D", "E"],
      indoors: ["A", "B", "C", "D", "E"],
    };
    let myStudentList = [];
    function changeElements(params) {
      myStudentList = [];
      const myStudents = students;
      myStudents.forEach((stdn, index) => {
        const student = Object.values(stdn);
        let isTrue = 0
        params.forEach(param => {
          if (student.includes(param)) {
            isTrue += 1;
          }
        });
        if (isTrue === params.length) {
          myStudentList.push(students[index])
        }
      });
    }
    function filterStudent(student) {
      const info = Object.values(student);

    }
    return {
      students,
    }
  }
}
</script>