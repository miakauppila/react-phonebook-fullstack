const mongoose = require("mongoose");

//testing mongo in the terminal
//give 3 arguments: node mongo.js password
//give 5 arguments node mongo.js password name phonenumber

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
if (process.argv.length === 4) {
  console.log("give password, name and phone number as separate arguments");
  process.exit(1);
}

if (process.argv.length > 5) {
  console.log("please check the given arguments");
  process.exit(1);
}

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.fyhlj.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");

  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  //constructor
  const person = new Person({
    name: newName,
    number: newNumber,
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
