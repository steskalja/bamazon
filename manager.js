var db = require('./db');
var log = require('./log');
var dB = new db();


class manager{
    constructor(){}
    getitems () {
        return new Promise((resolve, reject) =>
        {
            dB.ListItems().then((result) =>
            {
                 resolve(result);
            }).then(() => dB.close());
        });
    }
    getlowitems (){
        return new Promise((resolve, reject) =>
        {
            dB.ListItems().then((results) =>
            {
                var lowitems = [];
                for (var i = 0; i < results.length; i++) {
                    if(results[i].quantity <= 5)
                    {
                        lowitems.push(`${results[i].ID}, ${results[i].product_name},${results[i].quantity} `);
                    }
                }
                resolve(lowitems);
            }).then(() => dB.close());
        });
    }
    additems(itmN, qty)
    {
        return new Promise((resolve, reject) =>
        {
            dB.UpdateItem(itmN,qty).then((result) =>
            {
                    resolve(result);
            })
            .then(() => dB.close());
        })

    }
}

module.exports = manager;