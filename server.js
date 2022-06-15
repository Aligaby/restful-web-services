import app from "./src/app.js";
import mongoose from "mongoose";
import { accessDb } from "./config/dbConnect.js";

(function () {
  try {
    if (process.env.ENV === "Test") {
      mongoose.connect("mongodb://localhost/bookAPI_Test");
    } else {
      mongoose.connect(accessDb.MONGO_URI, { dbName: accessDb.MONGO_DB });
    }

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(
        `The server is running on port ${port}. Look my Nodemon API.`
      );
    });
  } catch (err) {
    throw new Error(
      `Connection on database is not established. This is the error\n${err}`
    );
  }
})();
