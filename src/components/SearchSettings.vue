<template>
  <nav class="flex justify-center flex-wrap mt-2 mx-2 rounded bg-white shadow">
    <select 
      v-for="(filter, name) in allFilters"
      :name="name"
      class="hidden my-px mx-1 p-4 border-black rounded"
      :key="name"
    >
      <option
        v-for="(item, index) in filter"
        :value="item"
        @click="$emit('addTags', name, item)"
        @select="$emit('addTags', name, item)"
        :key="index"
      >
        {{ item }}
      </option>
    </select>
    <section class="flex flex-col">
      <ol class="flex flex-row">
        <li v-for="(location, name) in locations" class="px-2" :key="name">
          <img 
            :src="require(`@/assets/icons/${location.img}`)"
            :class="{filter: location.active, grayscale: location.active}"
            @click="location.active = !locations[name].active"
            alt=""
          />
        </li>
      </ol>
      <ol class="flex flex-row justify-evenly" @click="rarity.change">
        <li v-for="stars in rarity.show" :key="stars">
          <img 
            src="@/assets/icons/star.png"
            alt="stars"
          />
        </li>
      </ol>
    </section>
    <section class="flex flex-col">
      <ol class="flex flex-row h-7 text-white font-semibold">
        <li
          class="px-3 rounded-l"
          :class="{'bg-red-800':combatClass.striker.active, 'bg-gray-300 text-black':!combatClass.striker.active}"
          @click="combatClass.striker.active = !combatClass.striker.active"
        >
          {{ combatClass.striker.name }}
        </li>
        <li
          class="px-3 rounded-r"
          :class="{'bg-blue-800':combatClass.special.active, 'bg-gray-200 text-black':!combatClass.special.active}"
          @click="combatClass.special.active = !combatClass.special.active"
        >
          {{ combatClass.special.name }}
        </li>
      </ol>
    </section>
    <button @click="$emit('newGroup')">Search</button>
  </nav>
</template>

<script>
import {reactive} from "vue";
export default {
  emits: ["addTags", "newGroup"],
  setup(){
    const allFilters = {
      //combat_class: ["Combat Class", "Striker", "Special"],
      //rarity: ["Rarity", 1, 2, 3],
      school: ["Academy","Abydos","Trinity","Gehenna","Millennium","Red Winter","Valkyrie","Hyakkiyako","Shanhaijing"],
      role: ["Role","Attacker","Supporter","Tank","Healer"],
      position: ["Position","Front","Middle","Back"],
      attack_type: ["ATK", "Penetration", "Explosive", "Mystic"],
      armor_type: ["DEF", "Heavy", "Light", "Special"],
      weapon_type: ["Weapon","HG","SMG","AR","SR","SG","MG","GL","RG","RF","RL","DualSMG","DualMG","MountMG"],
      use_cover: ["Use cover?", true, false],
      //urban: ["Urban", "S", "A", "B", "C", "D"],
      //outdoors: ["Outdoors", "S", "A", "B", "C", "D"],
      //indoors: ["Indoors", "S", "A", "B", "C", "D"],
    };
    const locations = reactive({
      urban: {
        active: false,
        img: "location_urban.png",
      },
      outdoors: {
        active: false,
        img: "location_outdoors.png",
      },
      indoors: {
        active: false,
        img: "location_indoors.png",
      },
    });
    const rarity = reactive({
      show: 3,
      change: () => {
        if (rarity.show < 3) {
          rarity.show = ++rarity.show;
        } else {
          rarity.show = 1;
        }
      }
    });
    const combatClass = reactive({
      striker: {name: "Striker", active: true},
      special: {name: "Special", active: true}
    });

    return {
      allFilters,
      locations,
      rarity,
      combatClass
    }
  },
  computed: {
    colorIfActive() {
      return {
        'bg-white': true
      }
    }
  }
}
</script>