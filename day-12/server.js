import { app } from "./src/app.js";
import { connectDB } from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();
app.listen(3000, () => {
  console.log("server running at port 3000");
});
