

class jsonCleanerAdapter {
  clean(json) {

    let cleanedJson = {};
    json.forEach(item => {
      cleanedJson[item.id] = item.category;
    });
    return cleanedJson;
  }
}

export default  new jsonCleanerAdapter();