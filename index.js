const readline = require("readline/promises");
const robot = require('robotjs')
var {loadJsonFile} = require('./load')

const listenKeyPresses = (callback = (key, data) => console.log({ key, data })) => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
  
    rl.input.on("keypress", callback);
    return rl;
};
  
listenKeyPresses.example = () => {
    listenKeyPresses(async (key, data) => {
        if (data.sequence === '\r')
        {
            await runInputs()

            throw new Error('stop')
        }
    });
};

listenKeyPresses.example() // run the example

async function runInputs()
{
    console.log('Cinco segundos...')
    await snooze(5000)

    var campos = loadJsonFile('./file.csv')
        
    for (var i = 0; i < campos.length; i++)
    {
        var campo = campos[i]

        console.log({campo})
        robot.typeString(campo.cell)
        robot.keyTap('\r')
        robot.typeString(campo.node)
        robot.keyTap('\r')

        await snooze(100)
    }
}

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));