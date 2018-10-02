var fs = require("fs");
var moment = require("moment");

class logging{
    constructor(

    ){}
    LogToFile(fn = "log.txt",data,vrb = false)
    {
        data = `${moment()} \r\n` + data;
        fs.appendFile(fn, data, function(err) {
            if (err)
            {
                console.log(err);
            }
            if(vrb === true)
            {
                console.log(`The data was appended to ${fn}`);
            }
        });
    };
}

module.exports = logging;