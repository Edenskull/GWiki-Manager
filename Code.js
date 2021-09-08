var ss = SpreadsheetApp.getActiveSpreadsheet();

var dev = true;

var urlBase = "https://script.google.com/macros/s/AKfycbx5AL3495XgTzr50RXx3gDt35MaTEYxGxQmgOkyMiw1/exec";
var urlDev = "https://script.google.com/macros/s/AKfycbx5AL3495XgTzr50RXx3gDt35MaTEYxGxQmgOkyMiw1/dev";

function doGet(request) {
  var params = request.parameter;
  if(params.page){
    PropertiesService.getScriptProperties().setProperty("page", "page/" + params.page);
  } else {
    PropertiesService.getScriptProperties().setProperty("page", "page/home");
  }
  return HtmlService.createTemplateFromFile('page/index')
      .evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function includeS(filename) {
  return HtmlService.createTemplateFromFile(filename)
    .evaluate().getContent();
}

function reloadProps() {
  PropertiesService.getScriptProperties().deleteAllProperties();
  var sheet = ss.getSheetByName("System_wiki_manager");
  var entries = sheet.getSheetValues(2, 1, sheet.getLastRow() - 1, 2);
  entries.forEach(function(entry) {
    PropertiesService.getScriptProperties().setProperty(entry[0], entry[1]);
  })
}

function getAllProps() {
  return PropertiesService.getScriptProperties().getProperties();
}

function getProp(propname) {
  return PropertiesService.getScriptProperties().getProperty(propname);
}

function getUrlBase() {
  var url = urlBase;
  if(dev) {
    url = urlDev;
  }
  return url;
}