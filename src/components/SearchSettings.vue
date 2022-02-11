<template>
  <section class="flex justify-center flex-wrap mt-2 mx-2 rounded bg-white shadow">
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
    <button @click="$emit('newGroup')">Search</button>
  </section>
</template>

<script>
import {reactive} from "vue";
export default {
  emits: ["addTags", "newGroup"],
  setup(){
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
    })

    return {
      allFilters,
      locations
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