var db = require('./db');
var dB = new db();

class customer{
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
    checkitem (itemN, qty)
    {
    return new Promise((resolve, reject) =>
        {
        dB.CheckItem(itemN, qty).then((result) =>
        {
            resolve(result);
        }).then(() => dB.close());
    });
    }
    buyitem (itmN, qty)
    {
        return new Promise((resolve, reject) =>
        {
            dB.UpdateItem(itmN,qty).then((result) =>
            {
                    resolve(result);
            }).then(() => dB.close());
        })

    }
    
}

module.exports = customer;