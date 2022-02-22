import { createStore } from 'vuex';

export default createStore({
  state: {
    rarity: -1,
    combatClass: {
      names: ["striker", "special"],
      striker: false,
      special: false,
    },
    useCover: false,
    weaponsTypes: {
      types: ["HG","SMG","AR","SR","SG","MG","GL","RG","RF","RL","DualSMG","DualMG","MountMG"],
      value: false,
    },
    school: {
      types: ["Abydos","Trinity","Gehenna","Millennium","Red Winter","Valkyrie","Hyakkiyako","Shanhaijing"],
      value: false,
    },
    role: {
      types: ["Attacker","Supporter","Tank","Healer"],
      value: false,
    },
    attackType: {
      types: ["Penetration", "Explosive", "Mystic"],
      colors: ["bg-yellow-400", "bg-red-400", "bg-blue-400"],
      value: false,
    },
    armorType: {
      types: ["Heavy", "Light", "Special"],
      colors: ["bg-yellow-700", "bg-red-700", "bg-blue-700"],
      value: false,
    },
    locations: {
      types: ["urban","outdoors","indoors"],
      value: false
    },
    position: {
      types: ["Front", "Middle", "Back"],
      value: false
    },
    sortBy: "",
  },
  mutations: {
    assignNewValue: (state, filter) => {
      state[filter.name] = filter.value;
    },
    changeValueTypes: (state, filter) => {
      if (state[filter.name].value === filter.newValue) {
        state[filter.name].value = false;  
      } else {
        state[filter.name].value = filter.newValue;
      }
    },
    changeCombatClass: (state, name) => {
      state.combatClass[name] = !state.combatClass[name];
    },
    changeRarity: (state) => {
      if (state.rarity < 3) {
        state.rarity = ++state.rarity;
      } else {
        state.rarity = -1;
      }
    }
  },
  actions: {
  },
  modules: {
  },
});