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
      urban: ["Urban", "S", "A", "B", "C", "D"],
      outdoors: ["Outdoors", "S", "A", "B", "C", "D"],
      indoors: ["Indoors", "S", "A", "B", "C", "D"],
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
          if (this.tags.includes(tag)) {
            this.filter[tag][0] = value;
          } else {
            this.tags.push(tag);
            this.filter[tag].push(value);
          }
        } else {
          const tagIndex = this.tags.findIndex(tg => tg === tag);
          this.tags.splice(tagIndex, 1);
          this.filter[tag].splice(0, 1);
        }
      }

      getStudentsByTags(students) {
        if (this.tags.length > 0) {
          let sg = students;
          let getStudents = [];
          let getStudentsIndex = [];
          this.tags.forEach((tag) => {
            getStudents = [];
            getStudentsIndex = [];
            sg.forEach((student) => {
              console.warn(`${student[tag]} === ${this.filter[tag][0]}`)
              if (student[tag] === this.filter[tag][0]) {
                console.info(`${student[tag]} === ${this.filter[tag][0]}`)
                getStudents.push(student);

                const gsIndex = students.findIndex(gs => gs.name === student.name)
                getStudentsIndex.push(gsIndex);
              }
            });
            console.info(getStudents)
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
      newStudentsGroup
    }
  },
}
</script>