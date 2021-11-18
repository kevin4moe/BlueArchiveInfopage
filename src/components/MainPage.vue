<template>
  <main class="flex flex-col bg-blue-100">
    <section class="flex justify-center flex-wrap mt-2 mx-2 rounded bg-white shadow">
      <select 
        v-for="(filter, name) in allFilters"
        :name="name"
        :key="name"
      >
        <option
          v-for="(item, index) in filter"
          :value="item"
          @click="studentGroup.addTags(name, item)"
          :key="index"
        >
          {{ item }}
        </option>
      </select>
      <button @click="newStudentsGroup">Search</button>
    </section>
    <section class="flex flex-wrap">
      <div 
        v-for="student in newStudents"
        class="w-full sm:w-1/2 lg:w-1/3"
        :key="student.name"
      >
        <card-view-complete :student="student" />
      </div>
    </section>
  </main>
</template>

<script>
import students from '@/assets/json/students.json'
import CardViewComplete from "@/components/CardViewComplete.vue";
import { reactive } from "vue";

export default {
  components: {
    CardViewComplete,
  },
  setup() {
    const allFilters = {
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
    class StudentFilter {
      filter = {
        rarity: [],
        school: [],
        role: [],
        position: [],
        attack_type: [],
        armor_type: [],
        combat_class: [],
        weapon_type: [],
        use_cover: [],
        urban: [],
        outdoors: [],
        indoors: [],
      };
      tags = [];

      addTags(tag, value) {
        // Detectar si existe la categoria
        if (Array.isArray(this.filter[tag])) {
          // Comprobar si ya se encuentra almacenado el valor
          const filterTagValueIndex = this.filter[tag].findIndex(item => item === value); 
          const tagIndex = this.tags.findIndex(item => item === tag);

          if (filterTagValueIndex < 0) {
            this.filter[tag].push(value);

            this.#modifyTags(tagIndex, tag);
          } else {
            this.filter[tag].splice(filterTagValueIndex, 1);

            this.#modifyTags(tagIndex, tag);
          }
        }
      }
      #modifyTags(index, tag) {
        // Comprobar si ya se encuentra almacenado el tag
        if (index < 0) {
          this.tags.push(tag);
        }

        if (this.filter[tag].length === 0) {
          const tagIndex = this.tags.findIndex(item => item === tag);
          this.tags.splice(tagIndex, 1)
        }
      }

      getStudentsByTags(students) {
        if (this.tags.length > 0) {
          let getStudents = students;
          this.tags.forEach(tag => {
            this.filter[tag].forEach(item => {
              getStudents = getStudents.filter(student => student[tag] === item);
            })
          });
          return getStudents;
        } else {
          console.warn('Tags are empty. Use addTags(tag, value).')
          return false;
        }
      }
    }


    const studentGroup = new StudentFilter;

    let sg = reactive(students)

    let newStudents = sg;

    return {
      newStudents,
      allFilters,
      studentGroup,
      sg
    }
  },
  computed: {
    myStudentsGroup() {
      return this.newStudents;
    },
  },
  methods: {
    newStudentsGroup() {
      this.newStudents = this.studentGroup.getStudentsByTags(students);
    },
  }
}
</script>