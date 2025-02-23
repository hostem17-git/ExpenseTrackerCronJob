class jsonCleanerAdapter {
  clean(json) {
    try {
      let cleanedJson = {};
      if (Array.isArray(json)) {
        json.forEach((item) => {
          cleanedJson[item.id] = {
            primarycategory: item.primarycategory,
            secondarycategory: item.secondarycategory,
          };
        });
      } else {
        cleanedJson[json.id] = json.category;
      }
      return cleanedJson;
    } catch (error) {
      console.log("Error cleaning json", error);
    }
  }
}

export default new jsonCleanerAdapter();
