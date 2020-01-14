'use strict';

var doAll = require("./toggl/doAll")

module.exports.getTogglData = async event => {
  try {
    console.log("ready to start")
    await doAll()  
    console.log("finished")

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Function executed successfully',
          input: event,
        },
        null,
        2
      ),
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
  
  

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
