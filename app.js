import { updateDatabase } from "./controllers/category.controller.js";
import express from "express"

const app = express();
app.use(express.json());

const BASE_ROUTE = "/api/v1";
const PORT = process.env.PORT || 3001;


app.use(`${BASE_ROUTE}/updateDB`,updateDatabase);

app.all("*",(req,res)=>{
  console.log("Invalid path hit");
  console.log(req.originalUrl);
  res.status(404).json({
      message:"Resource not found"
  });
});

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
});

