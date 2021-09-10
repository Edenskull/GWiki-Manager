function getAllTypes() {
  var sheet = ss.getSheetByName("Type_wiki_manager");
  var result = [];
  var values;
  try {
    values = sheet.getRange(3, 1, sheet.getLastRow() - 2).getValues();
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
  var duplicateCheck = checkForDuplicates(types)
  if(duplicateCheck) {
    return {"status": "error", "message": "Types are unique. Remove the duplicate line"};
  }
  if(types.includes("")) {
    return {"status": "error", "message": "Types can't be empty. Please enter a string."};
  }
  var sheet = ss.getSheetByName("Type_wiki_manager");
  try {
    sheet.getRange(3, 1, sheet.getLastRow() - 2).clear();
  } catch(e) {
    console.log("no lines to delete");
  }
  var result = []
  types.forEach(function(type) {
    result.push([type]);
  });
  sheet.getRange(3, 1, result.length).setValues(result);
  var newTypesLib = [];
  var sheetL = ss.getSheetByName("Libraries_wiki_manager");
  values = sheetL.getRange(2, 3, sheetL.getLastRow() - 1).getValues();
  values.forEach(function(value) {
    if(types.includes(value[0])) {
      newTypesLib.push([value[0]]);
    } else {
      newTypesLib.push(["Default"]);
    }
  })
  return {"status": "success"};
}

function getLibNumberWithType(type) {
  var sheet = ss.getSheetByName("Libraries_wiki_manager");
  var count = 0;
  var values;
  try {
    values = sheet.getRange(2, 3, sheet.getLastRow() - 1).getValues();
  } catch(e) {
    values = null;
  }
  if(values != null) {
    values.forEach(function(value) {
      if(value[0] == type) {
        count++
      }
    });
  } else {
    count = 0;
  }
  return count;
}