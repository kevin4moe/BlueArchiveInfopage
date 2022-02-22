class StudentFilter {
    filters = {
        types: ["weaponsTypes","school","role","attackType","armorType","locations","position"],
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
            types: ["rarity", "position"]
        }
    };
    studentsIndex = {
        all: [],
        current: [],
    };
    sortBy = {
        types: ["rarity"],
        rarity: {
            1: [4,6,12,22,25,26,31,34,35,39,43,52,59,63],
            2: [0,1,2,5,7,9,10,11,14,21,24,28,30,33,40,42,44,47,50,55,65,71],
            3: [3,8,13,15,16,17,18,19,20,23,27,29,32,36,37,38,41,45,46,48,49,51,53,54,56,57,58,60,61,62,64,66,67,68,69,70,72,73],
        }
    }

    searchStudents(students, state) {
        this.studentsIndex.current = [...Array(this.studentsIndex.all).keys()];

        const filters = [];
        // Add which filters value
        this.filters.types.forEach((filter) => {
            if (state[filter].value !== false) {
                if (state[filter].value > -1) {
                    filters.push(filter)
                } 
            }
        });
        if (filters.length > 0) {
            // For each filter we search in each student if both has the same value
            filters.forEach((filter) => {
                let studentsIndex = [];
                this.studentsIndex.current.forEach((index) => {
                    if (students[index][filter] === state[filter].types[state[filter].value]) {
                        studentsIndex.push(index);
                    }
                });
                this.studentsIndex.current = studentsIndex;
            });
        }

        if (state.rarity !== 0) {
            this.searchRarity(students, state);
        }
    }

    searchRarity(students, state) {
        let studentsIndex = [];
        this.studentsIndex.current.forEach((index) => {
            if (students[index].rarity === state.rarity) {
                studentsIndex.push(index);
            } else if (state.rarity === -2) {
                // Maybe some day
                this.sortBy.rarity[students[index].rarity].push(index)
            }
        });
        if (state.rarity >  0) {
            this.studentsIndex.current = studentsIndex;
        }
    }
}

export default StudentFilter;