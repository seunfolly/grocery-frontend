const mongoose = require('mongoose');

const dbConnect =  () => {
  try {
     mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zchdj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database error:", error);
  }
};

module.exports = dbConnect;


