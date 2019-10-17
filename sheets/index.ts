let HEADER_SIZE = 6

let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

function doPost(e) {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    let rawData = e.postData.contents;
    let projects: Projects = JSON.parse(rawData);

    for(let i = 0; i < projects.length; i++) {
        getCell(sheet, "A", i).setValue(projects[i].id)
        getCell(sheet, "E", i).setValue(projects[i].name)
        getCell(sheet, "F", i).setValue(projects[i].days)
        getCell(sheet, "G", i).setValue(projects[i].estimated_days)
        
        projects[i].insertedValues.forEach(keyValue => {
            getCell(sheet, keyValue.key, i).setValue(keyValue.value)
        })
    }
}

function doGet() {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    let data = sheet.getDataRange().getValues();
    let collector = []
    for (let i = 0; i < data.length - HEADER_SIZE; i++) {
        let id = getCell(sheet, "A", i).getValue()

        if(id == "") break;

        let insertedColumns = ["B", "C", "D", "Q"]
        let insertedValues = insertedColumns.map(key => {
            return { 
                key: key,
                value: valueOrZero(getCell(sheet, key, i).getValue()) 
            }
        })
        
        collector.push({id, insertedValues})
    }

    return ContentService.createTextOutput(JSON.stringify(collector));
}

function valueOrZero(data) {
    if(data == undefined)
        return 0
    return data
}

function getCell(sheet, char, row) {
    return sheet.getRange(row + HEADER_SIZE + 1, numberFor(char))
}


function numberFor(letterina) {
    return alphabet.indexOf(letterina) + 1
}

interface Project
{
    id: number,
    name: string;
    days: number;
    estimated_days: number;
    insertedValues: KeyValue[],
}

interface KeyValue {
    key: string,
    value: Object
}

type Projects = Project[];