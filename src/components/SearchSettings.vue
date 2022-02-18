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
    <section class="flex flex-row">
      <!-- Place & Rarity -->
      <div class="flex flex-col">
        <ol class="flex flex-row my-1">
          <li v-for="(place, placeName) in locations.place" class="px-2" :key="placeName">
            <img 
              :src="require(`@/assets/icons/${place.img}`)"
              :class="{filter: !place.active, grayscale: !place.active}"
              @click="locations.whichLocation(placeName)"
              alt=""
            />
          </li>
        </ol>
        <ol class="flex flex-row justify-evenly mb-1" @click="rarity.change">
          <li class="flex flex-row items-center text-xl" v-show="rarity.show === 0">
            All&nbsp;
            <img src="@/assets/icons/star.png" alt="stars" />
          </li>
          <li v-for="stars in rarity.show" :key="stars">
            <img 
              src="@/assets/icons/star.png"
              alt="stars"
            />
          </li>
        </ol>
      </div>
      <!-- Combat Class & Use Cover? -->
      <div class="flex flex-col justify-evenly w-40">
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
        <button
          class="h-7 rounded border border-black text-center"
          :class="{'bg-white text-black':!useCover, 'bg-gray-800 text-white font-semibold':useCover}"
          @click="useCover = !useCover"
        >
          ¿Cobertura? {{ useCover ? "Sí" : "No" }}
        </button>
      </div>
      <!-- Weapon Type -->
      <div class="flex flex-col justify-evenly w-40">
        <select class="h-full m-1 rounded bg-gray-200 text-center text-2xl font-bold">
          <option value="Any" @click="weapons.current = false" @select="weapons.current = false">Cualquiera</option>
          <option v-for="weapon in weapons.type" :value="weapon" :key="weapon" @click="weapons.current = weapon" @select="weapons.current = weapon">
            {{ weapon }}
          </option>
        </select>
      </div>
      <!-- Position -->
      <div class="flex flex-col justify-evenly w-22">
        <select name="position" class="h-7 m-1 rounded bg-gray-800 text-center text-white font-semibold">
          <option value="position" @click="position.current = false" @select="position.current = false">POSITION</option>
          <option 
            v-for="line in position.types"
            :value="line" 
            @click="position.current = line" @select="position.current = line"
            :key="line"
          >
            {{ line.toUpperCase() }}
          </option>
        </select>
      </div>
    </section>
    <button @click="$emit('newGroup')">Search</button>
  </nav>
</template>

<script>
import { ref, reactive, watch } from "vue";
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

    const rarity = reactive({
      show: 0,
      change: () => {
        if (rarity.show < 3) {
          rarity.show = ++rarity.show;
        } else {
          rarity.show = 0;
        }
      }
    });
    const combatClass = reactive({
      striker: {name: "Striker", active: true},
      special: {name: "Special", active: true}
    });
    const useCover = ref(true);
    const weapons = reactive({
      type: ["HG","SMG","AR","SR","SG","MG","GL","RG","RF","RL","DualSMG","DualMG","MountMG"],
      current: false
    });

    const sort = [false, false]
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
    watch(
      () => locations.sortBy,
      (sortBy) => {
        sort[0] = "position";
        sort[1] = sortBy;
      }
    )
    const position = reactive({
      types: ["all", "front", "middle", "back"],
      current: false,
    })


    let searchFilters = {
      combat_class: false,
      rarity: false,
      school: false,
      role: false,
      position: false,
      attack_type: false,
      armor_type: false,
      weapon_type: false,
      use_cover: false,
      urban: false,
      outdoors: false,
      indoors: false,
    };

    function updateSearchFilters() {
      searchFilters = {
        combat_class: {
          striker: combatClass.striker.active,
          special: combatClass.special.active,
        },
        rarity: rarity.show,
        school: false,
        role: false,
        position: false,
        attack_type: false,
        armor_type: false,
        weapon_type: weapons.current,
        use_cover: useCover,
        sort_by: [false, false],
      };
      if(searchFilters.role) {
        console.log(searchFilters)
      }
    }
    updateSearchFilters()

    return {
      allFilters,
      locations,
      rarity,
      combatClass,
      useCover,
      weapons,
      position
    }
  },
  computed: {
    colorIfActive() {
      return {
        'bg-white': true
      }
    }
  },
}
</script>