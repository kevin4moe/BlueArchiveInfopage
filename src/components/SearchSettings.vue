<template>
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
        @click="$emit('addTags', name, item)"
        :key="index"
      >
        {{ item }}
      </option>
    </select>
    <button @click="newStudentsGroup">Search</button>
  </section>
</template>

<script>
export default {
  emits: ["addTags"],
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

    return {
      allFilters
    }
  }
}
</script>