require('dotenv').config()
const TogglClient = require('toggl-api')

let axios = require('axios');
let toggl = new TogglClient({apiToken: process.env.TOGGL_API_TOKEN})
let workSpaceId = process.env.TOGGL_WORKSPACE_ID
let googleApi = "https://script.google.com/macros/s/" + process.env.GOOGLE_API_ID + "/exec"

doAll()

async function doAll() {
    let projectIds = await getProjectIds()

    toggl.getWorkspaceProjects(workSpaceId, (err, projects) => {
        let updatedValues = projects
        .filter(project => projectIds.includes(project.id))
        .map(project => sheetProject(project))
        .sort((project1, project2) => project1.id - project2.id)

        postProjects(updatedValues)
    });
}

function sheetProject(project) {
    return {
        id: project.id,
        name: project.name,
        days: getDaysFrom(project.actual_hours),
        estimated_days: getDaysFrom(project.estimated_hours)
     }
}

function getDaysFrom(hours) {
    if(hours == undefined)
        hours = 0
    return hours / 8
}

async function getProjectIds() {
    return await axios.get(googleApi).then(response => {
        return response.data;
    }).catch(console.log);
}

async function postProjects(data) {
    return await axios.post(googleApi, data).then(response => {
        return response.data;
    }).catch(console.log);
}