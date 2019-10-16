#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
(
    source "$DIR/.env"
    cd "$DIR/sheets"
    clasp push
    clasp deploy -i $GOOGLE_API_ID
)