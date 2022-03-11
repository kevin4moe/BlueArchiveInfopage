class StudentFilter {
  filters = {
    types: [
      "weaponsTypes",
      "school",
      "role",
      "attackType",
      "armorType",
      "locations",
      "position",
    ],
    typesNum: ["rarity"],
    typesE: ["combatClass"],
    typesBool: ["useCover"],
    values: {
      indexT: [],
      indexN: [],
      indexE: [],
      indexB: [],
    },
    sortBy: {
      types: ["rarity", "position"],
    },
  };
  studentsIndex = {
    all: [],
    current: [],
  };
  sortBy = {
    types: ["rarity", "combatClass"],
    rarity: {
      1: [],
      2: [],
      3: [],
    },
    combatClass: {
      striker: [],
      special: [],
    },
    active: false,
  };

  searchStudents(students, state) {
    this.studentsIndex.current = [...Array(this.studentsIndex.all).keys()];

    const filters = [];
    // Add which filters value
    this.filters.types.forEach((filter) => {
      if (state[filter].value !== false) {
        if (state[filter].value > -1) {
          filters.push(filter);
        }
      }
    });
    if (filters.length > 0) {
      // For each filter we search in each student if both has the same value
      filters.forEach((filter) => {
        let studentsIndex = [];
        this.studentsIndex.current.forEach((index) => {
          if (
            students[index][filter] === state[filter].types[state[filter].value]
          ) {
            studentsIndex.push(index);
          }
        });
        this.studentsIndex.current = studentsIndex;
      });
    }

    if (state.combatClass.striker || state.combatClass.special) {
      this.searchTeam(students, state);
    }

    if (state.rarity > -1) {
      this.searchRarity(students, state);
    } else {
      this.sortBy.active = false;
    }
  }

  searchRarity(students, state) {
    let studentsIndex = [];
    this.sortBy.rarity[1] = [];
    this.sortBy.rarity[2] = [];
    this.sortBy.rarity[3] = [];
    this.studentsIndex.current.forEach((index) => {
      if (students[index].rarity === state.rarity) {
        studentsIndex.push(index);
      } else if (state.rarity === 0) {
        this.sortBy.rarity[students[index].rarity].push(index);
        this.sortBy.active = true;
      }
    });
    if (state.rarity > 0) {
      this.studentsIndex.current = studentsIndex;
    } else {
      this.studentsIndex.current = [
        ...this.sortBy.rarity[3],
        ...this.sortBy.rarity[2],
        ...this.sortBy.rarity[1],
      ];
    }
  }

  searchTeam(students, state) {
    this.sortBy.combatClass.striker = [];
    this.sortBy.combatClass.special = [];
    let studentsIndex = [];
    this.studentsIndex.current.forEach((index) => {
      if (
        students[index].combatClass === "Striker" &&
        state.combatClass.striker
      ) {
        this.sortBy.combatClass.striker.push(index);
      } else if (
        students[index].combatClass === "Special" &&
        state.combatClass.special
      ) {
        this.sortBy.combatClass.special.push(index);
      }
      studentsIndex = [
        ...this.sortBy.combatClass.striker,
        ...this.sortBy.combatClass.special,
      ];
      this.studentsIndex.current = studentsIndex;
      //this.sortBy.active = true;
    });
  }
}

export default StudentFilter;
