const connectDB = require("./config/db");
const mongoose = require("mongoose");

// Connect to database
connectDB();

//model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
  height: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
  },
});

const Person = mongoose.model("person", personSchema);

//create one person

const createPerson = async () => {
  const person = new Person({
    name: "ghanem",
    age: 26,
    favoriteFoods: ["ma9roona", "koskous"],
    height: 182,
    email: "ghanemamn1929@gmail.com",
  });
  try {
    const result = await person.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

createPerson();

//create multiple people

const createMultiple = async () => {
  try {
    const person = await Person.create([
      {
        name: "chaima  ",
        age: 25,
        favoriteFoods: ["ma9loob"],
        height: 166,
        email: "chaimasouilah11@gmail.com",
      },
      {
        name: "chiheb",
        age: 30,
        favoriteFoods: ["ma9roona", "koskous"],
        height: 175,
        email: "chihebchaboo@gmail.com",
      },
      {
        name: "ahlem",
        age: 23,
        favoriteFoods: ["kol chy"],
        height: 150,
        email: "ahlemgg@gmail.com",
      },
    ]);
    const result = person.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

createMultiple();

//find people
const getPeople = async () => {
  try {
    /* const person = await Person.find(); */
    /* const person = await Person.findOne({ favoriteFoods: "kol chy" }); */
    /* const person = await Person.findById("62f510219d6b94e21f009142"); */
    console.log(person);
  } catch (err) {
    console.error(err.message);
  }
};

getPeople();

//find person by id , update and save
const findUpdateSave = async () => {
  try {
    const id = "62f510219d6b94e21f009144";
    const person = await Person.findByIdAndUpdate(id, {
      $push: { favoriteFoods: "hamburger" },
    });
    console.log(person);
    person.save();
  } catch (err) {
    console.error(err.message);
  }
};

findUpdateSave();

//find one person, update and save
const findOneUpdateSave = async () => {
  try {
    const person = await Person.findOneAndUpdate(
      { name: "ghanem" },
      {
        $set: { age: 26 },
      },
      { new: true }
    );
    console.log(person);
    person.save();
  } catch (err) {
    console.error(err.message);
  }
};

findOneUpdateSave();

//delete one person by id
const deletePerson = async () => {
  try {
    const id = "62f510219d6b94e21f009142";
    const person = await Person.findByIdAndRemove(id);
    console.log(person);
    person.save();
  } catch (err) {
    console.error(err.message);
  }
};

deletePerson();

//remove all people named Mary
const deleteManyPeople = async () => {
  try {
    const person = await Person.deleteMany({ name: "Mary" });
    /* person.save(); */
  } catch (err) {
    console.error(err.message);
  }
};

deleteManyPeople();

//people likes buritos
const peopleLikesBuritos = async () => {
  try {
    const person = await Person.find({ favoriteFoods: "buritos" })
      .limit(2)
      .sort({ name: 1 })
      .select({ age: -1 });
    console.log(person);
  } catch (err) {
    console.error(err.message);
  }
};

peopleLikesBuritos();
