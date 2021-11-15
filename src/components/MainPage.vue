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
    class StudentList {
      #allFilters = {
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
      constructor(students, rarity, school, role, position, attack_type, armor_type, combat_class, weapon_type, use_cover, urban, outdoors, indoors) {
        this.students = students;
        this.rarity = rarity;
        this.school = school;
        this.role = role;
        this.position = position;
        this.attack_type = attack_type;
        this.armor_type = armor_type;
        this.combat_class = combat_class;
        this.weapon_type = weapon_type;
        this.use_cover = use_cover;
        this.urban = urban;
        this.outdoors = outdoors;
        this.indoors = indoors;
        this.tosearch = [
          "rarity","school","role","position","attack_type",
          "armor_type","combat_class","weapon_type","use_cover",
          "urban","outdoors","indoors",
        ];
      }

      get myStudentList() {
        const fields = this.thereFields();
        let tags = [];
        if (fields.length > 0) {
          tags = this.isNewGroup();
        }
        else {
          return false;
        }
        if (tags) {
          return this.searchStudents(tags);
        }
        return [0];
      }

      thereFields() {
        this.tosearch = this.tosearch.filter(key => Array.isArray(this[key]));
        return this.tosearch;
      }

      isNewGroup() {
        const tags = [];
        this.tosearch.forEach(keys => {
          if (this[keys].length !== this.#allFilters[keys].length) {
            tags.push(this[keys]);
          }
        });
        console.info(tags)
        if (tags.length === 0) {
          return false;
        } else {
          return tags;
        }
      }

      searchStudents(studentTags) {
        const studentIds = [];
        this.students.forEach((student, index) => {
          let isInGroup = 0;
          studentTags.forEach((tags, i) => {
            tags.forEach(tag => {
              if (student[this.tosearch[i]] === tag) {
                  isInGroup += 1;
              }
            })
          });
          if (isInGroup === studentTags.length) {
            studentIds.push(index)
          }
        });
        return studentIds;
      }
    }

    const studentGroup = new StudentList(students, [1]) // Esto debe ser una función, eliminar esto

    return {
      students,
      studentGroup
    }
  }
}
</script>