function getAllTypes() {
  var sheet = ss.getSheetByName("Type_wiki_manager");
  var result = [];
  var values;
  try {
    values = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
  } catch(e) {
    values = null
  }
  if(values) {
    values.forEach(function(val) {
      result.push(val[0]);
    });
  } else {
    result = [];
  }
  return result;
}

function saveTypes(types) {
  var sheet = ss.getSheetByName("Type_wiki_manager");
  try {
    sheet.getRange(2, 1, sheet.getLastRow() - 1).clear();
  } catch(e) {
    console.log("no lines to delete");
  }
  var result = []
  types.forEach(function(type) {
    result.push([type]);
  });
  sheet.getRange(2, 1, result.length).setValues(result);
}