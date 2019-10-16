function appendHelloWorld() {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow(["Hello", "world", "!"]);
}