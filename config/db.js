const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


// connecting to mangoose.conenct() will give back a promise

const dbConnect = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`[DB] MongoDB Conected`);
  } catch(err) {
    console.log(`[ERROR][DB]${err.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = dbConnect;
