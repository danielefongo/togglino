let HEADER_SIZE = 6

function doPost(e) {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    let rawData = e.postData.contents;
    let projects: Projects = JSON.parse(rawData);

    for(let i = 0; i < projects.length; i++) {
        sheet.getRange(i + HEADER_SIZE + 1, 1).setValue(projects[i].id)
        sheet.getRange(i + HEADER_SIZE + 1, 4).setValue(projects[i].name)
        sheet.getRange(i + HEADER_SIZE + 1, 5).setValue(projects[i].days)
        sheet.getRange(i + HEADER_SIZE + 1, 6).setValue(projects[i].estimated_days)
    }
}

function doGet() {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    let data = sheet.getDataRange().getValues();
    let collector = []
    for (let i = 0; i < data.length - HEADER_SIZE; i++) {
        let name = sheet.getRange(i + HEADER_SIZE + 1, 1).getValue()
        collector.push(name)
    }

    return ContentService.createTextOutput(JSON.stringify(collector));
}

interface Project
{
    id: number,
    name: string;
    days: number;
    estimated_days: number;
}

type Projects = Project[];