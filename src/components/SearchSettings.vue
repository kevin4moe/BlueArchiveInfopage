<template>
  <nav class="flex justify-center flex-wrap mt-2 mx-2 rounded bg-white shadow">
    <section class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
      <!-- ATK, DEF & Role -->
      <div class="flex flex-col justify-evenly w-40 h-20 mx-1">
        <div class="flex flex-row justify-center h-7">
          <select
            name="attack_type"
            class="w-1/2 rounded-l bg-gray-800 text-center text-white font-semibold"
            :class="store.state.attackType.colors[store.state.attackType.value]"
          >
            <option
              value="attack_type"
              @click="
                store.commit('changeValueTypes', {
                  name: 'attackType',
                  newValue: false,
                })
              "
            >
              ATK
            </option>
            <option
              v-for="(type, index) in store.state.attackType.types"
              :class="store.state.attackType.colors[index]"
              :value="type"
              @click="
                store.commit('changeValueTypes', {
                  name: 'attackType',
                  newValue: index,
                })
              "
              :key="type"
            >
              {{ type.toUpperCase() }}
            </option>
          </select>
          <select
            name="armor_type"
            class="w-1/2 rounded-r bg-gray-800 text-center text-white font-semibold"
            :class="store.state.armorType.colors[store.state.armorType.value]"
          >
            <option
              value="armor_type"
              @click="
                store.commit('changeValueTypes', {
                  name: 'armorType',
                  newValue: false,
                })
              "
            >
              DEF
            </option>
            <option
              v-for="(type, index) in store.state.armorType.types"
              :class="store.state.armorType.colors[index]"
              :value="type"
              @click="
                store.commit('changeValueTypes', {
                  name: 'armorType',
                  newValue: index,
                })
              "
              :key="type"
            >
              {{ type.toUpperCase() }}
            </option>
          </select>
        </div>
        <select
          name="role"
          class="h-7 rounded bg-gray-800 text-center text-white font-semibold"
        >
          <option
            value="role"
            @click="
              store.commit('changeValueTypes', {
                name: 'role',
                newValue: false,
              })
            "
          >
            ROLE
          </option>
          <option
            v-for="(type, index) in store.state.role.types"
            :value="type"
            @click="
              store.commit('changeValueTypes', {
                name: 'role',
                newValue: index,
              })
            "
            :key="type"
          >
            {{ type.toUpperCase() }}
          </option>
        </select>
      </div>
      <!-- Combat Class & Use Cover? -->
      <div class="flex flex-col justify-evenly w-40 h-20 mx-1">
        <ol class="flex flex-row justify-center h-7 text-white font-semibold">
          <li
            class="w-1/2 rounded-l text-center"
            :class="{
              'bg-red-800': store.state.combatClass.striker,
              'bg-gray-300 text-black': !store.state.combatClass.striker,
            }"
            @click="store.commit('changeCombatClass', 'striker')"
            @touch="store.commit('changeCombatClass', 'striker')"
          >
            {{ store.state.combatClass.names[0].toUpperCase() }}
          </li>
          <li
            class="w-1/2 rounded-r text-center"
            :class="{
              'bg-blue-800': store.state.combatClass.special,
              'bg-gray-200 text-black': !store.state.combatClass.special,
            }"
            @click="store.commit('changeCombatClass', 'special')"
            @touch="store.commit('changeCombatClass', 'special')"
          >
            {{ store.state.combatClass.names[1].toUpperCase() }}
          </li>
        </ol>
        <button
          class="h-7 rounded border border-black text-center"
          :class="{
            'bg-white text-black': !store.state.useCover,
            'bg-gray-800 text-white font-semibold': store.state.useCover,
          }"
          @click="
            store.commit('assignNewValue', {
              name: 'useCover',
              value: !store.state.useCover,
            })
          "
          @touch="
            store.commit('assignNewValue', {
              name: 'useCover',
              value: !store.state.useCover,
            })
          "
        >
          Cover? {{ store.state.useCover ? "Yes" : "No" }}
        </button>
      </div>
      <!-- Weapon Type -->
      <div class="flex flex-col justify-evenly w-40 h-20">
        <select
          name="weapon_type"
          class="h-full m-1 rounded bg-gray-200 text-center text-2xl font-semibold"
        >
          <option
            value="Any"
            @click="
              store.commit('changeValueTypes', {
                name: 'weaponsTypes',
                newValue: false,
              })
            "
          >
            WEAPONS
          </option>
          <option
            v-for="(weapon, index) in store.state.weaponsTypes.types"
            :value="weapon"
            :key="weapon"
            @click="
              store.commit('changeValueTypes', {
                name: 'weaponsTypes',
                newValue: index,
              })
            "
          >
            {{ weapon }}
          </option>
        </select>
      </div>
      <!-- Position -->
      <div class="flex flex-col justify-evenly w-22 h-20">
        <select
          name="position"
          class="h-full m-1 rounded bg-gray-200 text-center text-2xl font-semibold"
        >
          <option
            value="position"
            @click="
              store.commit('changeValueTypes', {
                name: 'position',
                newValue: false,
              })
            "
          >
            POSITION
          </option>
          <option
            class="hidden"
            value="position"
            @click="
              store.commit('changeValueTypes', {
                name: 'position',
                newValue: -1,
              })
            "
          >
            ALL
          </option>
          <option
            v-for="(name, index) in store.state.position.types"
            :value="name"
            @click="
              store.commit('changeValueTypes', {
                name: 'position',
                newValue: index,
              })
            "
            :key="name"
          >
            {{ name.toUpperCase() }}
          </option>
        </select>
      </div>
      <!-- School -->
      <div class="flex flex-col justify-evenly w-40 h-20">
        <select
          name="school"
          class="h-full m-1 rounded bg-gray-200 text-center text-2xl font-semibold"
        >
          <option
            value="school"
            @click="
              store.commit('changeValueTypes', {
                name: 'school',
                newValue: false,
              })
            "
          >
            SCHOOL
          </option>
          <option
            v-for="(type, index) in store.state.school.types"
            :value="type"
            @click="
              store.commit('changeValueTypes', {
                name: 'school',
                newValue: index,
              })
            "
            :key="type"
          >
            {{ type.toUpperCase() }}
          </option>
        </select>
      </div>
      <!-- Place & Rarity -->
      <div class="flex flex-col">
        <ol class="flex flex-row my-1">
          <li
            v-for="(name, index) in store.state.locations.types"
            class="px-2"
            :key="name"
          >
            <img
              :src="require(`@/assets/icons/location_${name}.png`)"
              :class="{
                filter: store.state.locations.value !== index,
                grayscale: store.state.locations.value !== index,
              }"
              @click="
                store.commit('changeValueTypes', {
                  name: 'locations',
                  newValue: index,
                })
              "
              :alt="name"
            />
          </li>
        </ol>
        <ol
          class="flex flex-row justify-evenly mb-1"
          @click="store.commit('changeRarity')"
          @touch="store.commit('changeRarity')"
        >
          <li
            class="flex flex-row items-center text-xl"
            v-show="store.state.rarity === -1"
          >
            ANY&nbsp;
            <img src="@/assets/icons/star.png" alt="stars" />
          </li>
          <li
            class="flex flex-row items-center text-xl"
            v-show="store.state.rarity === 0"
          >
            ALL&nbsp;
            <img src="@/assets/icons/star.png" alt="stars" />
          </li>
          <li
            v-for="stars in 3"
            v-show="stars <= store.state.rarity"
            :key="stars"
          >
            <img src="@/assets/icons/star.png" alt="stars" />
          </li>
        </ol>
      </div>
    </section>
    <button
      class="w-20 h-10 bg-blue-300 my-1 sm:my-auto lg:my-1 rounded-lg text-blue-900 font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      @click="$emit('newGroup')"
      @touch="$emit('newGroup')"
    >
      Search
    </button>
  </nav>
</template>

<script>
import { useStore } from "vuex";
export default {
  emits: ["newGroup"],
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  computed: {
    colorIfActive() {
      return {
        "bg-white": true,
      };
    },
  },
};
</script>
