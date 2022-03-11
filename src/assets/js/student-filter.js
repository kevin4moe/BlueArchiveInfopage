class StudentFilter {
  filter = {
    rarity: [],
    school: [],
    role: [],
    position: [],
    attack_type: [],
    armor_type: [],
    combat_class: [],
    weapon_type: [],
    use_cover: [],
    urban: [],
    outdoors: [],
    indoors: [],
  };
  noTags = [
    "Combat Class",
    "Rarity",
    "Academy",
    "Role",
    "Position",
    "ATK",
    "DEF",
    "Weapon",
    "User cover?",
    "Urban",
    "Outdoors",
    "Indoors",
  ];
  tags = [];

  addTags(tag, value) {
    const isTag = this.noTags.findIndex((noTag) => noTag === value);
    // Detectar si existe la categoria
    if (isTag < 0) {
      if (this.tags.includes(tag)) {
        this.filter[tag][0] = value;
      } else {
        this.tags.push(tag);
        this.filter[tag].push(value);
      }
    } else {
      const tagIndex = this.tags.findIndex((tg) => tg === tag);
      this.tags.splice(tagIndex, 1);
      this.filter[tag].splice(0, 1);
    }
  }

  getStudentsByTags(students) {
    if (this.tags.length > 0) {
      let sg = students;
      let getStudents = [];
      let getStudentsIndex = [];
      this.tags.forEach((tag) => {
        getStudents = [];
        getStudentsIndex = [];
        sg.forEach((student) => {
          console.warn(`${student[tag]} === ${this.filter[tag][0]}`);
          if (student[tag] === this.filter[tag][0]) {
            console.info(`${student[tag]} === ${this.filter[tag][0]}`);
            getStudents.push(student);

            const gsIndex = students.findIndex(
              (gs) => gs.name === student.name
            );
            getStudentsIndex.push(gsIndex);
          }
        });
        console.info(getStudents);
        sg = getStudents;
      });
      return getStudentsIndex;
    } else {
      console.warn("Tags are empty. Use addTags(tag, value).");
      const arrayAll = [...Array(students.length).keys()];
      return arrayAll;
    }
  }
}

export default StudentFilter;
