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
        <li v-for="(place, placeName) in locations.place" class="px-2" :key="placeName">
          <img 
            :src="require(`@/assets/icons/${place.img}`)"
            :class="{filter: !place.active, grayscale: !place.active}"
            @click="locations.whichLocation(placeName)"
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
    <section class="flex flex-col justify-evenly w-40">
      <ol class="flex flex-row justify-center h-7 text-white font-semibold">
        <li
          class="w-1/2 rounded-l text-center"
          :class="{'bg-red-800':combatClass.striker.active, 'bg-gray-300 text-black':!combatClass.striker.active}"
          @click="combatClass.striker.active = !combatClass.striker.active"
        >
          {{ combatClass.striker.name }}
        </li>
        <li
          class="w-1/2 rounded-r text-center"
          :class="{'bg-blue-800':combatClass.special.active, 'bg-gray-200 text-black':!combatClass.special.active}"
          @click="combatClass.special.active = !combatClass.special.active"
        >
          {{ combatClass.special.name }}
        </li>
      </ol>
      <ol class="hidden h-7 font-semibold">
        <li
          class="w-1/2 rounded-l border-t border-b border-l border-black text-center"
          :class="{'bg-black text-white':useCover.active, 'bg-white text-black':!useCover.active}"
          @click="useCover.active = !useCover.active"
        >
          Sí
        </li>
        <li
          class="w-1/2 rounded-r border-t border-b border-r border-black text-center"
          :class="{'bg-white text-black':useCover.active, 'bg-black text-white':!useCover.active}"
          @click="useCover.active = !useCover.active"
        >
          No
        </li>
      </ol>
      <button
        class="h-7 rounded border border-black text-center"
        :class="{'bg-white text-black':!useCover.active, 'bg-gray-800 text-white font-semibold':useCover.active}"
        @click="useCover.active = !useCover.active"
      >
        ¿Cobertura? {{ useCover.active ? "Sí" : "No" }}
      </button>
    </section>
    <section class="flex flex-col justify-evenly w-40">
      <select class="h-full m-1 rounded bg-gray-200 text-center text-2xl font-bold">
        <option value="Any" @click="weapons.current = false" @select="weapons.current = false">Cualquiera</option>
        <option v-for="weapon in weapons.type" :value="weapon" :key="weapon" @click="weapons.current = weapon" @select="weapons.current = weapon">
          {{ weapon }}
        </option>
      </select>
    </section>
    <button @click="$emit('newGroup')">Search</button>
  </nav>
</template>

<script>
import { reactive } from "vue";
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
      //weapon_type: ["Weapon","HG","SMG","AR","SR","SG","MG","GL","RG","RF","RL","DualSMG","DualMG","MountMG"],
      //use_cover: ["Use cover?", true, false],
      //urban: ["Urban", "S", "A", "B", "C", "D"],
      //outdoors: ["Outdoors", "S", "A", "B", "C", "D"],
      //indoors: ["Indoors", "S", "A", "B", "C", "D"],
    };
    const locations = reactive({
      place: {
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
      },
      sortBy: false,
      whichLocation: (placeName) => {
        if (locations.place[placeName].active) {
          locations.place[placeName].active = false;
          locations.sortBy = false;
        } else {
          (placeName === "urban") ? locations.place[placeName].active = true : locations.place.urban.active = false ; 
          (placeName === "outdoors") ? locations.place[placeName].active = true : locations.place.outdoors.active = false ; 
          (placeName === "indoors") ? locations.place[placeName].active = true : locations.place.indoors.active = false ;   
          locations.sortBy = placeName;
        }
      }
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
    const useCover = reactive({
      isTrue: true
    });
    const weapons = reactive({
      type: ["HG","SMG","AR","SR","SG","MG","GL","RG","RF","RL","DualSMG","DualMG","MountMG"],
      current: false
    });

    return {
      allFilters,
      locations,
      rarity,
      combatClass,
      useCover,
      weapons
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