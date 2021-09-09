var ss = SpreadsheetApp.getActiveSpreadsheet();

function createLibrary(name, type, description) {
  var newSheet = ss.insertSheet("_LIB00_" + name);
  var libSheet = ss.getSheetByName("Libraries_wiki_manager");
  var currentDate = new Date();
  libSheet.appendRow([newSheet.getSheetName(), name, type, description, currentDate.toISOString()]);
}

function getAllLibraries() {
  var sheet = ss.getSheetByName("Libraries_wiki_manager");
  var result = {
    "libraries" : []
  };
  try {
    var values = sheet.getSheetValues(2, 1, sheet.getLastRow() - 1, 5);
    values.forEach((value) => {
      result["libraries"].push({
        "uniqueName": value[0],
        "name": value[1],
        "type": value[2],
        "desc": value[3],
        "timestamp": value[4]
      });
    });
  } catch(e) {
    var result = null;
  }
  return result;
}

function deleteLibrary(uniqueName) {
  var sheet = ss.getSheetByName("Libraries_wiki_manager");
  ss.deleteSheet(ss.getSheetByName(uniqueName));
  var values = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
  values = flatten(values);
  var currentIndex = values.indexOf(uniqueName);
  sheet.deleteRow(currentIndex + 2);
}

function editLibrary(uniqueName, params) {
  var sheet = ss.getSheetByName(uniqueName);
  sheet.getRange(1, 1, 1, sheet.getLastColumn());
  sheet.getRange(1, 1, 1, params.lenght).setValues([params]);
}
