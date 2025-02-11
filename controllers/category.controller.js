import categoryRepository from "../repositories/category.repository.js";
import chatgptService from "../services/chatgpt.service.js";
import jsonCleanerAdapter from "../adapter/jsonCleaner.adapter.js";

export const updateDatabase = async (req, res) => {
  try {

    res.status(200).json({
      message: "Ok",
    });

    console.log("Initiating updateCategories");

    const data = await categoryRepository.readPendingRows();
    console.log(`Fetched ${Object.keys(data).length} Rows`);

    if (data.length == 0) {
      console.log("Nothing to update");
      return;
    }

    const categories = await chatgptService.requestCategories(data);
    const cleanedCategories = jsonCleanerAdapter.clean(categories);

    await categoryRepository.updateCategories(cleanedCategories);
    console.log("updateCategories completed");
    
   
  } catch (error) {
    console.log("Error updating database", error);
  }
};
