import shell from 'shelljs';

const addParams = process.argv;
let file = '';
let timeout = 30000; // Default timeout

// Check for 'file' argument
if (addParams[2] === 'file' && addParams[3]) {
    file += addParams[3];
}

// Check if '--timeout' is passed as an argument
const timeoutIndex = addParams.indexOf('--timeout');
if (timeoutIndex > -1 && addParams[timeoutIndex + 1]) {
    timeout = addParams[timeoutIndex + 1];
}

// Execute Mocha test with file and timeout
shell.exec(`npx mocha --timeout=${timeout} --colors ${file} --reporter mochawesome --reporter-options reportDir=./mochawesome-report,reportFilename=index,overwrite=true,html=true,json=false`);
