require('dotenv').config()
let TogglClient = require('toggl-api')

let toggl = new TogglClient({apiToken: process.env.TOGGL_API_TOKEN})
let workSpaceId = process.env.TOGGL_WORKSPACE_ID

toggl.getWorkspaceProjects(workSpaceId, (err, workSpaces) => {
    console.log(workSpaces)
});