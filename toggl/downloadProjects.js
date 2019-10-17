require('dotenv').config()
const TogglClient = require('toggl-api')

let toggl = new TogglClient({apiToken: process.env.TOGGL_API_TOKEN})
let workSpaceId = process.env.TOGGL_WORKSPACE_ID
const clientId = process.env.TOGGL_CLIENT_ID

toggl.getWorkspaceProjects(workSpaceId, (err, workSpaces) => {
   let clientProjects = workSpaces.filter((project) => project.cid == clientId)
    for (const project of clientProjects) {
        console.log(project)
    }
});