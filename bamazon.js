var cus = require("./customer");
var mgr = require("./manager");
var inquirer = require("inquirer");

var cst = new cus();

var manager = new mgr();

var usr = process.argv[2];

switch(usr)
{
    case 'customer':
    cst.getitems().then((result) =>
    {
        var results = result;
       inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(`${results[i].ID}, ${results[i].product_name},${results[i].price},${results[i].quantity} `);
            }
            return choiceArray;
          },
          message: "What item would you like to buy?"
        },
        {
          name: "qty",
          type: "input",
          message: "How much do you want to buy?"
        }
      ]).then
      ((answers) => {
        var itm = answers.choice.split(",");
        var qty = answers.qty;
        var InStock = itm[3];

            if(parseInt(InStock) >= parseInt(qty))
            {   
                var total = parseFloat(itm[2]) * parseFloat(qty);
                console.log(`Your Total for ${qty} x ${itm[1]} is ${total}`);
                cst.buyitem(itm[0],(parseInt(InStock) - parseInt(qty))).then((result) =>
                {
                    console.log(result);
                });
            }
            else
            {
                console.log("There are not enough items to purchase");
            }

      }

      );

    }); 
    break;
    case 'manager':
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = ['GetItems','LowQuantity','UpdateItem'];
            return choiceArray;
          },
          message: "What would you like to do?"
        }]).then((answers) => {
            switch(answers.choice)
            {
                case 'GetItems':
                manager.getitems().then((result) =>
                {
                    var itemArray = [];
                    console.log("ID, Name, Price, Quantity");
                    for (var i = 0; i < result.length; i++) {
                        console.log(`${result[i].ID}, ${result[i].product_name}, ${result[i].price}, ${result[i].quantity}`);
                    }

                });
                break;
                case 'LowQuantity':
                manager.getlowitems().then((result) =>
                {
                    console.log("ID, Name, Quantity");
                    for (var i = 0; i < result.length; i++) 
                    {
                     console.log(result[i]);
                    }

                });
                break;
                case 'UpdateItem':
                manager.getitems().then((result) =>
                {
                    var results = result;
                    inquirer
                    .prompt([
                    {
                        name: "choice",
                        type: "rawlist",
                        choices: function() {
                        var choiceArray = [];
            
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(`${results[i].ID}, ${results[i].product_name},${results[i].quantity} `);
                        }
                            return choiceArray;
                        },
                        message: "What item would you like to increase?"
                    },
                    {
                    name: "qty",
                    type: "input",
                    message: "How much do you want to add?"
                    }
                    ]).then((answers) =>{
                        var itm = answers.choice.split(",");
                        var qty = parseInt(answers.qty) + parseInt(itm[2]);
                        manager.additems(itm[0],qty).then((result) =>
                        {
                            console.log(result);
                        })
                    });

                });
                break;
            }
        }
        );
    break;
    default:
    console.log("Choose customer or manager");
}