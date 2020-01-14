### Requirements

```
npm install @google/clasp -g
clasp login
npm install serverless -g
```

Enable google apps script [here](https://script.google.com/home/usersettings)

### Environment variables

This project requires these variables (to be put in `.env` file in the root of the project)

```
TOGGL_API_TOKEN=<toggl api token>
TOGGL_WORKSPACE_ID=<toggl workspace id>
TOGGL_CLIENT_ID=<toggl client id>
GOOGLE_SCRIPT_ID=<google script id>
GOOGLE_API_ID=<google api id>
GOOGLE_SHEET_ID=<google sheet id>

```

### Setup

```
npm install
source .env
echo "{\"scriptId\":\"${GOOGLE_SCRIPT_ID}\"}" > sheets/.clasp.json
```

### Deploy

To deploy google script, run the following command:

```
./publish.sh
```

To deploy lambda function using servless, run the following command:

```
sls deploy
```

### Test

```
source .env
curl -L --insecure https://script.google.com/macros/s/$GOOGLE_API_ID/exec
```
