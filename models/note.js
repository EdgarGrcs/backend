const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("Connecting to", url);

mongoose.connect(url)
.then(result => {
    console.log("connected to MongoDB");
})
.catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
})

const noteSchema = new mongoose.Schema({
  content:String,
  important:Boolean,
})

// removes __V when looking at the JSON from the browser
noteSchema.set("toJSON",{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Note", noteSchema);

//`mongodb+srv://edgargrcs:${password}@fso-practice.7bsrnl7.mongodb.net/noteApp?retryWrites=true&w=majority`;