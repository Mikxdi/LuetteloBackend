const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =`mongodb://mikko:${password}@cluster0-shard-00-00-thlcb.mongodb.net:27017,cluster0-shard-00-01-thlcb.mongodb.net:27017,cluster0-shard-00-02-thlcb.mongodb.net:27017/fullstack-2020?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    })
    mongoose.connection.close()
  })

} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(res => {
    console.log(person);
    console.log('person saved');
    mongoose.connection.close()
  })
}