import { menuDb } from './DataBase/MenuDB.js';

const getMenuData = async(req, res) => {
    try{
        const data = await menuDb.find({}, {dishName: 1, cost: 1, ingredients: 1, _id: 0});
        res.json({data: data});
    } catch {
        res.json({message: 'Error from getMenu'});
    }
}

export {getMenuData};