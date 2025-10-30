const mongoose = require("mongoose");
// CHANGE 1: REMOVED this controller import.
// This created a circular dependency and was crashing your server.
// A model file must NEVER import a controller file.
// const { addTable, getTables, updateTable } = require("../controllers/tableController");

const tableSchema = new mongoose.Schema({
  tableNo: { type: Number, required: true, unique: true },
  status: {
    type: String,
    default: "Available",
  },
  seats:{
    type:Number,
    required:true
  },
  // CHANGE 2: The 'ref' must match the model name from orderModal.js ("order")
  currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
});

module.exports = mongoose.model("Table", tableSchema);