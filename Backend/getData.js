import { orderOnlineDb } from "./DataBase/orderOnlineDB.js"

const getOrdersOnline = async(req, res) => {
    try {
        const dbAns = await orderOnlineDb.find({}, {'invite_id': 1, 'dishes': 1, 'typeOfOrder': 1, 'cost': 1, 'email': 1, '_id': 0});
        if(dbAns.length === 0) throw new Error('error - find in dataBase in getOrdersOnline');
        res.send(dbAns);
    } catch (error) {
        res.json({message: error.message})
    }
}

export {getOrdersOnline}