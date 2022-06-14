import app from "./src/app.js";
import mongoose from "mongoose";
import { accessDb } from "./config/dbConnect.js";

async function startServer() {
  await mongoose.connect(accessDb.MONGO_URI, {dbName: accessDb.MONGO_DB});
  
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(
      `The server is running on port ${port}. Look in the browser to see my Nodemon API.`,
    );
  });
}

startServer();
