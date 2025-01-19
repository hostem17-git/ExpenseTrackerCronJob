import { updateDatabase } from "./controllers/category.controller.js";


const updateCategories = async ()=>{
    console.log("Initiating updateCategories");
    await updateDatabase();
    console.log("updateCategories completed");
}

updateCategories();

