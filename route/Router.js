function doGet(request) {
  var params = request.parameter;
  if(params.page || params.page != undefined || params.page != null) {
    PropertiesService.getScriptProperties().setProperty("page", params.page);
  } else {
    PropertiesService.getScriptProperties().setProperty("page", "home");
  }
  if(params.pageTitle || params.pageTitle != undefined || params.pageTitle != null) {
    PropertiesService.getScriptProperties().setProperty("pageTitle", "Library - " + params.pageTitle);
  } else {
    PropertiesService.getScriptProperties().setProperty("pageTitle", "Libraries");
  }
  if(params.id || params.id != undefined || params.id != null) {
    PropertiesService.getScriptProperties().setProperty("id", params.id);
  }
  return HtmlService.createTemplateFromFile("page/index").evaluate();
}

function contentDisplay() {
  return HtmlService.createHtmlOutputFromFile("page/" + PropertiesService.getScriptProperties().getProperty("page"))
      .getContent();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function getPageTitle() {
  return PropertiesService.getScriptProperties().getProperty("pageTitle");
}