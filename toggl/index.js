require('dotenv').config()
const TogglClient = require('toggl-api')

let axios = require('axios');
let toggl = new TogglClient({apiToken: process.env.TOGGL_API_TOKEN})
let workSpaceId = process.env.TOGGL_WORKSPACE_ID
let googleApi = "https://script.google.com/macros/s/" + process.env.GOOGLE_API_ID + "/exec"

doAll()

async function doAll() {
    let sheetProjects = await getProjectFromSheet()
    let projectsIds = sheetProjects.map(project => project.id)

    toggl.getWorkspaceProjects(workSpaceId, (err, togglProjects) => {
        let updatedValues = togglProjects.filter(togglProject => projectsIds.includes(togglProject.id))
        .map(togglProject => toSheetProject(togglProject, getSheetProjectFrom(sheetProjects, togglProject.id)))
        .sort((project1, project2) => project1.id - project2.id)

        postProjects(updatedValues)
    });
}

function getSheetProjectFrom(sheetProjects, id) {
    return sheetProjects.filter(project => project.id == id)[0]
}

function toSheetProject(togglProject, sheetProject) {
    return {
        id: togglProject.id,
        name: togglProject.name,
        days: getDaysFrom(togglProject.actual_hours),
        estimated_days: getDaysFrom(togglProject.estimated_hours),
        insertedValues: sheetProject.insertedValues
     }
}

function getDaysFrom(hours) {
    return valueOrZero(hours) / 8
}

function valueOrZero(data) {
    if(data == undefined)
        return 0
    return data
}

async function getProjectFromSheet() {
    return await axios.get(googleApi).then(response => {
        return response.data;
    }).catch(console.log);
}

async function postProjects(data) {
    return await axios.post(googleApi, data).then(response => {
        return response.data;
    }).catch(console.log);
}