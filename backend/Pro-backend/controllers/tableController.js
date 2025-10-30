const createHttpError = require("http-errors");
const mongoose=require("mongoose");
// CHANGE 1: Removed unused and incorrect imports
// const { create } = require("../modals/tableModal");
// const { json } = require("express");

// CHANGE 2: Import the 'Table' model
const Table = require("../modals/tableModal");

// CHANGE 3: The function must be 'async' to use 'await'
const addTable = async (req, res, next) => {
  try {
    const { tableNo, seats } = req.body;
    if (!tableNo) {
      const error = createHttpError(400, "Please provide table number");
      // CHANGE 4: Must use 'next(error)' to pass to error handler
      return next(error);
    }

    // These lines now work
    const isTablePresent = await Table.findOne({ tableNo });
    if (isTablePresent) {
      const error = createHttpError(400, "Table already exist!");
      return next(error); // CHANGE 4: Must use 'next(error)'
    }

    const newTable = new Table({ tableNo,seats }); // Status defaults from schema
    await newTable.save();
    res
      .status(201)
      .json({ success: true, message: "Table added", data: newTable });
  } catch (error) {
    return next(error);
  }
};

// CHANGE 3: The function must be 'async'
const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().populate({
      path:"currentOrder",
      select:"customerDetails"
    });
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    return next(error);
  }
};

// CHANGE 3: The function must be 'async'
const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;
     const{id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
      const error=createHttpError(404,"Invalid Id");
            return next(error);  
    }
    const table = await Table.findByIdAndUpdate(
      id, // This ID comes from tableRoutes.js
      { status, currentOrder: orderId },
      { new: true }
    );

    if (!table) {
      const error = createHttpError(404, "Table not found!");
      return next(error); // CHANGE 4: Must use 'next(error)'
    }

    res.status(200).json({ success: true, message: "Table Updated", data: table });
  } catch (error) {
    return next(error);
  }
};

module.exports = { addTable, getTables, updateTable };