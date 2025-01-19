import categoryRepository from "../repositories/category.repository.js"
import chatgptService from "../services/chatgpt.service.js";


export const updateDatabase = async()=>{
    try{
        const data = await categoryRepository.readPendingRows();
        console.log("Fetched Rows",data);
    
        if(data.length == 0){
            console.log("Nothing to update");
            return;
        }
    
        const categories = await chatgptService.requestCategories(data);
    
        const result = await categoryRepository.updateCategories(categories);
        console.log("Updated categories",result);   
        
    }catch(error){ 
        console.log("Error updating database",error);
    }
}

