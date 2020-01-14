var doAll = require("./doAll")
console.log("starting");

async function run(){
    await doAll()
    console.log("end-----------------------------");
}

run()
