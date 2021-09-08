var ss = SpreadsheetApp.getActiveSpreadsheet();

function createLibrary(name, type, description) {
  var newSheet = ss.insertSheet("_LIB00_" + name);
  var currentId = newSheet.getSheetId();
  var libSheet = ss.getSheetByName("Libraries_wiki_manager");
  var currentDate = new Date();
  libSheet.appendRow([name, type, description, currentId, currentDate.toISOString()]);
  return currentId;
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
        "name": value[0],
        "type": value[1],
        "desc": value[2],
        "googl_id": value[3],
        "timestamp": value[4]
      });
    });
  } catch(e) {
    var result = null;
  }
  return result;
}
