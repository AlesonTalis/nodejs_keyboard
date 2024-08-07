var fs = require('fs');
var path = require('path');

function loadJsonFile(fileName = '')
{
    var filePath = path.join(__dirname, fileName);
    // Read CSV
    var f = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
        function(err){console.log(err);});

    // Split on row
    f = f.split(/\r?\n|\r|\n/g);

    // Get first row for column headers
    headers = f.shift().split(";");

    var json = [];    
    f.forEach(function(d){
        // Loop through each row
        tmp = {}
        row = d.split(";")
        for(var i = 0; i < headers.length; i++){
            tmp[headers[i]] = row[i];
        }
        // Add object to list
        json.push(tmp);
    });

    return json
}

module.exports = {
    loadJsonFile
}