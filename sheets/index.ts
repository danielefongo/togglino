function doPost(e) {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow(["Hello", "world", "!"]);
}

function doGet() {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    let data = sheet.getDataRange().getValues();
    let collector = ""
    for (var i = 0; i < data.length; i++) {
        collector += data[i] + "\n"
    }

    return ContentService.createTextOutput(collector);
}