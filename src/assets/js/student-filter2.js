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
    searchStudents(students, state) {
        const filters = [];
        // Add which filters value
        this.filters.values.indexT.forEach((index) => {
            filters.push(this.filters.types[index])
        })
        this.filters.types.forEach((filter) => {
            if (state[filter].value !== false) {
                if (state[filter].value > -1) {
                    filters.push(filter)
                } 
            }
        })

        this.studentsIndex.current = [...Array(this.studentsIndex.all).keys()];
        // For each filter we search in each student if both has the same value
        console.log(filters)
        filters.forEach((filter) => {
            let studentsIndex = [];
            this.studentsIndex.current.forEach((index) => {
                if (students[index][filter] === state[filter].types[state[filter].value]) {
                    console.log(`${students[index][filter]} === ${state[filter].types[state[filter].value]}`)
                    studentsIndex.push(index);
                }
            });
            this.studentsIndex.current = studentsIndex;
        });
        this.studentsIndex.current.forEach(val => {
            console.info(students[val].name)
        })
    }
}

export default StudentFilter;