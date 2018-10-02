var logging = require('./log');
var mysql = require("mysql");

var log = new logging();

var config = {
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon_db"
  };

class DB{
    constructor (){
        //this.connection = mysql.createConnection( config );
        this.connection;
    };
    ListItems (){
        this.connection = mysql.createConnection( config );
        return new Promise((resolve, reject) =>
        {
            this.connection.query("SELECT ID,product_name,price,quantity FROM sale_items", function(err, results) {
            if (err)
            { 
                log.LogToFile("",err,true);
                reject(err);
            }
                resolve(results);
            });
            
          });   
    };
    CheckItem(inmb,cnt){
        this.connection = mysql.createConnection( config );
        return new Promise((resolve, reject) =>
        {
            this.connection.query(`SELECT price,quantity FROM sale_items where ID = ${inmb}`, function(err, results) {
                if (err)
                { 
                    log.LogToFile("log.txt",err,true);
                    reject(err);
                }
                if(results[0].quantity >= cnt){
                    resolve(true);
                }
                else
                {
                    resolve(false);
                }
                   
            });
                
        });     
    }
    GetQuantity (inmb){
        this.connection = mysql.createConnection( config );
        return new Promise((resolve, reject) =>
        {
            this.connection.query(`SELECT quantity FROM sale_items where ID = ${inmb}`, function(err, results) {
            if (err)
            { 
                log.LogToFile("log.txt",err,true);
                reject(err);
            }
                resolve(results);
            });
            
          });   
    };
    UpdateItem(inmb,cnt){
        this.connection = mysql.createConnection( config );
        return new Promise((resolve, reject) =>
        {
            console.log(inmb);
           var qstring = `Update sale_items SET quantity = ${cnt} where ID = ${inmb}`;
           console.log(qstring);
            this.connection.query(qstring, function(err, results) {
                if(err)
                {
                    log.LogToFile("log.txt",err,true);
                    reject(err);
                }
                console.log(results);
                resolve(results);
            });
                
                 
            
                
        });     
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                {
                    log.LogToFile("log.txt",err,true);
                    reject(err);
                }
                resolve();
            } );
        } );
    }

}



module.exports = DB;