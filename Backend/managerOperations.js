import { orderOnlineDb } from "./DataBase/orderOnlineDB.js"
import { tableDb } from "./DataBase/tables.js";
import { menuDb } from "./DataBase/MenuDB.js";
import { ingredientDb } from "./DataBase/IngredientsDB.js";

const getOrdersOnline = async(req, res) => {
    try {
        const dbAns = await orderOnlineDb.find({}, {'invite_id': 1, 'dishes': 1, 'typeOfOrder': 1, 'cost': 1, 'email': 1, '_id': 0});
        res.send(dbAns);
    } catch (error) {
        res.json({message: error.message})
    }
}

const deleteOrderByManager = async(req, res) => {
    try {
        const deleteID = req.body.inviteID;
        await orderOnlineDb.findOneAndDelete({'invite_id': deleteID});
        res.json({message: `order ${deleteID} deleted`})
    } catch (error) {
        res.json({message: error.message});
    }
}

const getReservation = async(req, res) => {
    try {
        const dbAns = await tableDb.find({}, {'_id': 0, 'table_id': 1, 'chairNumber': 1, 'invitesList': 1});
        const arrToSend = [];
        if(dbAns.length !== 0) {
            dbAns.forEach((item) => {
                if(item.invitesList.length !== 0) {
                    let obj;
                    item.invitesList.forEach((invite) => {
                        obj = {};
                        obj = {
                            table_id: item.table_id,
                            chairNumber: item.chairNumber,
                            email: invite.user_email,
                            hour: invite.hour,
                            date: invite.date
                        };
                        arrToSend.push(obj);
                    })
                }
            })
        }
        res.send(arrToSend);
    } catch (err) {
        res.json({message: err.message});
    }
}

const getMenu = async(req, res) => {
    try {
        const dbAns = await menuDb.find({}, {'_id': 0, 'ingredients._id': 0, 'dish_id': 0});
        res.send(dbAns)
    } catch (error) {
        res.json({message: error.message});
    }

}

const deleteDish = async(req, res) => {
    try{
        const dishToDelete = req.body.dishToDelete;
        const dbAns = await menuDb.findOneAndDelete({'dishName': dishToDelete});
        res.json({message: dbAns});
    } catch (error) {
        res.json({message: error.message});
    }
}

const changeMenu = async(req, res) => {
    try{
        //find in menu and update
        const dbAns = await menuDb.findOneAndUpdate({dishName: req.body.dishName}, {$set: {dishName: req.body.newName, cost: req.body.newCost}});
        console.log(req.body);
        res.json({message: dbAns})
    } catch(error) {
        res.json({message: error.message});
    }
}

const getIngredients = async(req, res) => {
    try {
        const dbAns = await ingredientDb.find({}, {'_id': 0, 'ingredient_id': 0});
        res.json({message: dbAns})
    } catch(error) {
        res.json({message: error.message});
    }
}

const changeIngredients = async(req, res) => {
    try {
        const dbAns = await ingredientDb.findOneAndUpdate({ingredientName: req.body.ingredientName}, {$set: {amount: req.body.amount}});
        console.log(dbAns);
        res.json({message: dbAns});
    } catch(error) {
        res.json({message: error.message});
    }
}

export {getOrdersOnline, deleteOrderByManager, getReservation, getMenu, deleteDish, changeMenu, getIngredients, changeIngredients}