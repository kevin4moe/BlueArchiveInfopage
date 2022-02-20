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
      <!-- ATK, DEF & Role -->
      <div class="flex flex-col justify-evenly w-40 mx-1">
        <div class="flex flex-row justify-center h-7">
          <select name="attack_type" class="w-1/2 rounded-l bg-gray-800 text-center text-white font-semibold" :class="attack_type.colors[attack_type.current]">
            <option value="attack_type" @click="attack_type.changeCurrent(false)" @select="attack_type.changeCurrent(false)">ATK</option>
            <option 
              v-for="(type, index) in attack_type.types"
              :class="attack_type.colors[index]"
              :value="type" 
              @click="attack_type.changeCurrent(index)" @select="attack_type.changeCurrent(index)"
              :key="type"
            >
              {{ type.toUpperCase() }}
            </option>
          </select>
          <select name="armor_type" class="w-1/2 rounded-r bg-gray-800 text-center text-white font-semibold" :class="armor_type.colors[armor_type.current]">
            <option value="armor_type" @click="armor_type.changeCurrent(false)" @select="armor_type.changeCurrent(false)">DEF</option>
            <option 
              v-for="(type, index) in armor_type.types"
              :class="armor_type.colors[index]"
              :value="type" 
              @click="armor_type.changeCurrent(index)" @select="armor_type.changeCurrent(index)"
              :key="type"
            >
              {{ type.toUpperCase() }}
            </option>
          </select>
        </div>
        <select name="role" class="h-7 rounded bg-gray-800 text-center text-white font-semibold">
          <option value="role" @click="role.changeCurrent(false)" @select="role.changeCurrent(false)">ROLE</option>
          <option 
            v-for="type in role.types"
            :value="type" 
            @click="role.changeCurrent(type)" @select="role.changeCurrent(type)"
            :key="type"
          >
            {{ type.toUpperCase() }}
          </option>
        </select>
      </div>
      <!-- Combat Class & Use Cover? -->
      <div class="flex flex-col justify-evenly w-40 mx-1">
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
        <select name="weapon_type" class="h-full m-1 rounded bg-gray-200 text-center text-2xl font-semibold">
          <option value="Any" @click="weapons.current = false" @select="weapons.current = false">Cualquiera</option>
          <option v-for="weapon in weapons.type" :value="weapon" :key="weapon" @click="weapons.current = weapon" @select="weapons.current = weapon">
            {{ weapon }}
          </option>
        </select>
      </div>
      <!-- Position -->
      <div class="flex flex-col justify-evenly w-22">
        <select name="position" class="h-full m-1 rounded bg-gray-200 text-center text-2xl font-semibold">
          <option value="position" @click="position.sortBy = false" @select="position.sortBy = false">POSITION</option>
          <option 
            v-for="line in position.types"
            :value="line" 
            @click="position.sortBy = line" @select="position.sortBy = line"
            :key="line"
          >
            {{ line.toUpperCase() }}
          </option>
        </select>
      </div>
      <!-- School -->
      <div class="flex flex-col justify-evenly w-40">
        <select name="school" class="h-full m-1 rounded bg-gray-200 text-center text-2xl font-semibold">
          <option value="school" @click="school.changeCurrent(false)" @select="school.changeCurrent(false)">SCHOOL</option>
          <option 
            v-for="type in school.types"
            :value="type" 
            @click="school.changeCurrent(type)" @select="school.changeCurrent(type)"
            :key="type"
          >
            {{ type.toUpperCase() }}
          </option>
        </select>
      </div>
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
            ALL&nbsp;
            <img src="@/assets/icons/star.png" alt="stars" />
          </li>
          <li class="flex flex-row items-center text-xl" v-show="rarity.show === -1">
            ANY&nbsp;
            <img src="@/assets/icons/star.png" alt="stars" />
          </li>
          <li v-for="stars in 3" v-show="stars <= rarity.show" :key="stars">
            <img 
              src="@/assets/icons/star.png"
              alt="stars"
            />
          </li>
        </ol>
      </div>
    </section>
    <button @click="updateSearchFilters">Search</button>
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
      //school: ["Academy","Abydos","Trinity","Gehenna","Millennium","Red Winter","Valkyrie","Hyakkiyako","Shanhaijing"],
      //role: ["Role","Attacker","Supporter","Tank","Healer"],
      //position: ["Position","Front","Middle","Back"],
      //attack_type: ["ATK", "Penetration", "Explosive", "Mystic"],
      //armor_type: ["DEF", "Heavy", "Light", "Special"],
      //weapon_type: ["Weapon","HG","SMG","AR","SR","SG","MG","GL","RG","RF","RL","DualSMG","DualMG","MountMG"],
      //use_cover: ["Use cover?", true, false],
      //urban: ["Urban", "S", "A", "B", "C", "D"],
      //outdoors: ["Outdoors", "S", "A", "B", "C", "D"],
      //indoors: ["Indoors", "S", "A", "B", "C", "D"],
    };

    const rarity = reactive({
      show: -1,
      change: () => {
        if (rarity.show < 3) {
          rarity.show = ++rarity.show;
        } else {
          rarity.show = -1;
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
    const school = reactive({
      types: ["Abydos","Trinity","Gehenna","Millennium","Red Winter","Valkyrie","Hyakkiyako","Shanhaijing"],
      current: false,
      changeCurrent: (type) => {
        school.current = type;  
      }
    });
    const role = reactive({
      types: ["Attacker","Supporter","Tank","Healer"],
      current: false,
      changeCurrent: (type) => {
        role.current = type;  
      }
    });
    const attack_type = reactive({
      types: ["Penetration", "Explosive", "Mystic"],
      colors: ["bg-yellow-400", "bg-red-400", "bg-blue-400"],
      current: false,
      changeCurrent: (type) => {
        attack_type.current = type;  
      }
    });
    const armor_type = reactive({
      types: ["Heavy", "Light", "Special"],
      colors: ["bg-yellow-700", "bg-red-700", "bg-blue-700"],
      current: false,
      changeCurrent: (type) => {
        armor_type.current = type;  
      }
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
        sort[0] = "locations";
        sort[1] = sortBy;
      }
    );
    const position = reactive({
      types: ["all", "front", "middle", "back"],
      sortBy: false,
    });
    watch(
      () => position.sortBy,
      (sortBy) => {
        sort[0] = "position";
        sort[1] = sortBy;
      }
    );


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
        position: position.sortBy,
        attack_type: false,
        armor_type: false,
        weapon_type: weapons.current,
        use_cover: useCover.value,
        sort_by: sort,
      };
      console.log(searchFilters)
    }

    return {
      updateSearchFilters,
      allFilters,
      locations,
      rarity,
      combatClass,
      useCover,
      weapons,
      position,
      school,
      role,
      attack_type,
      armor_type,
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