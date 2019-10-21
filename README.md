### Requirements

```
npm install @google/clasp -g
clasp login
```

Enable google apps script [here](https://script.google.com/home/usersettings)

### Setup

```
source .env
echo "{\"scriptId\":\"${GOOGLE_SCRIPT_ID}\"}" > sheets/.clasp.json
```

### Deploy
 
```
./publish.sh
```

### Test

```
source .env
curl -L --insecure https://script.google.com/macros/s/$GOOGLE_API_ID/exec
```
