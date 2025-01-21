

class jsonCleanerAdapter {
  clean(json) {
    console.log("----------------")
    // console.log("length",JSON.);
    console.log("json",json);
    console.log("type",typeof(json));
    let cleanedJson = {};
    if(Array.isArray(json)){
      json.forEach(item => {
        cleanedJson[item.id] = item.category;
      });
    }else{
      cleanedJson[json.id] = json.category;
    }
    return cleanedJson;
  }
}

export default  new jsonCleanerAdapter();