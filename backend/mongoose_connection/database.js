const mongoose = require("mongoose");

const db = process.env.DATABASE;

const mDatabase=()=>{mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("database connected"))
}
// Above Promise is not handled on rejection
module.exports=mDatabase;