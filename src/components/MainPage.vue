<template>
  <main class="flex flex-col bg-blue-100">
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
    </section>
  </main>
</template>

<script>
import students from '@/assets/json/students.json'
import CardViewComplete from "@/components/CardViewComplete.vue";
import { ref, reactive } from "vue";

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
      urban: ["Urban", "A", "B", "C", "D", "E"],
      outdoors: ["Outdoors", "A", "B", "C", "D", "E"],
      indoors: ["Indoors", "A", "B", "C", "D", "E"],
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
      noTags = [
        "Combat Class", "Rarity", "Academy",
        "Role", "Position", "ATK", "DEF",
        "Weapon", "User cover?", "Urban",
        "Outdoors", "Indoors"
      ];
      tags = [];

      addTags(tag, value) {
        const isTag = this.noTags.findIndex(noTag => noTag === value);
        // Detectar si existe la categoria
        if (isTag < 0) {
          // Comprobar si ya se encuentra almacenado el valor
          const filterTagValueIndex = this.filter[tag].findIndex(item => item === value); 
          const tagIndex = this.tags.findIndex(item => item === tag);

          if (filterTagValueIndex < 0) {
            this.filter[tag].push(value);

            this.modifyTags(tagIndex, tag);
          } else {
            this.filter[tag].splice(filterTagValueIndex, 1);

            this.modifyTags(tagIndex, tag);
          }
        }
      }
      modifyTags(index, tag) {
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
          let sg = students;
          let getStudents = [];
          let getStudentsIndex = [];
          this.tags.forEach((tag, i) => {
            getStudents = getStudents.filter(student => student[tag] === this.filter[tag][0]);
            sg.forEach((student, index) => {
              if (student[tag] === this.filter[tag][0]) {
                getStudents.push(student);
                if (i === 0) {
                  getStudentsIndex.push(index);
                }
              } else if (i > 0) {
                getStudents.splice(index, 1);
                getStudentsIndex.splice(index, 1);
              }
            });
            sg = getStudents;
          });
          return getStudentsIndex;
        } else {
          console.warn('Tags are empty. Use addTags(tag, value).')
          const arrayAll = [...Array(students.length).keys()];
          return arrayAll;
        }
      }
    }

    let studentGroupIndex = ref([...Array(students.length).keys()]);
    let sf = reactive(new StudentFilter);
    function newStudentsGroup() {
      studentGroupIndex.value = sf.getStudentsByTags(students);
    }

    return {
      students,
      allFilters,
      studentGroupIndex,
      sf,
      newStudentsGroup,
      combatClass
    }
  },
}
</script>