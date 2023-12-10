function doGet(request) {
    var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1olib7JHyRkYCcONAEldqvON8vgNfy_lzUJW902utww8/edit?usp=sharing')
    var name = request.parameter.name
    var stuid = request.parameter.stuid
    var email = request.parameter.email
    var act = request.parameter.act
    var acttype = request.parameter.acttype
    var year = request.parameter.year
    var sem = request.parameter.sem
    var std = request.parameter.std
    var end = request.parameter.end
    var loc = request.parameter.loc
    var des = request.parameter.des
    var sheet = ss.getSheetByName('S1')
    sheet.appendRow([name,stuid,email,act,acttype,year,sem,std,end,loc,des])
    var result = {}
    result.result = 'added'
    var result = JSON.stringify(result);
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  }
  