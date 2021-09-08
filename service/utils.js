function getAllTypes() {
  var sheet = ss.getSheetByName("Type_wiki_manager");
  var result = []
  var values = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
  values.forEach(function(val) {
    result.push(val[0]);
  });
  return result;
}

function getAllTimezones() {
  return UrlFetchApp.fetch("http://worldtimeapi.org/api/timezone").getAs('application/json');
}