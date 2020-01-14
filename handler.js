'use strict';

require('dotenv').config()
var doAll = require("./toggl/doAll")

module.exports.getTogglData = async event => {
  try {
    console.log("ready to start")
    await doAll()
    console.log("finished")

    return {
      statusCode: 301,
      headers: {
        Location: 'https://docs.google.com/spreadsheets/d/' + process.env.GOOGLE_SHEET_ID,
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: JSON.stringify(error),
          input: event,
        },
        null,
        2
      ),
    };
  }
};
