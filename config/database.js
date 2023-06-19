import mongoose from "mongoose";

const Database = () => {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default Database;
