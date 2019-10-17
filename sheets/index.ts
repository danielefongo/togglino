function doPost(e) {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    let rawData = e.postData.contents;
    let projects: Projects = JSON.parse(rawData);

    for(let i = 0; i < projects.length; i++) {
        sheet.getRange(i + 1, 1).setValue(projects[i].id)
        sheet.getRange(i + 1, 2).setValue(projects[i].name)
        sheet.getRange(i + 1, 3).setValue(projects[i].hours)
    }
}

function doGet() {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    let data = sheet.getDataRange().getValues();
    let collector = []
    for (let i = 0; i < data.length; i++) {
        let name = sheet.getRange(i + 1, 1).getValue()
        collector.push(name)
    }

    return ContentService.createTextOutput(JSON.stringify(collector));
}

interface Project
{
    id: number,
    name: string;
    hours: number;
}

type Projects = Project[];