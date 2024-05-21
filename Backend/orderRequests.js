import { orderOnlineDb } from './DataBase/orderOnlineDB.js';

const orderOnlineMethod = async(req, res) => {
    try{

    let maxId = await orderOnlineDb.aggregate([
        {
            $group: {
                _id: null,
                maxInviteId: {$max: '$invite_id'}
            }
        }
    ]);
    maxId = maxId.length === 0 ? maxId = 1 : maxId[0].maxInviteId + 1;
    //* delete the food with count:0 from array    
    //*found the last food in req.body:
    const bodyArr = [];
    let countOfFood = 0;
    for(let i in req.body) {
        if(req.body[i].count !== 0) {
            bodyArr.push(req.body[i]);
            countOfFood += 1;
        }
    }
    countOfFood--;
    const foodArray = bodyArr.slice(0, countOfFood);
    const details = bodyArr.slice(countOfFood);
    console.log(foodArray);
    await orderOnlineDb.insertMany({
        invite_id: maxId,
        dishes: foodArray,
        typeOfOrder: details[0]['typeOfOrder'],
        cost: details[0]['cost'],
        statusOfOrder: 'preparing',
        email: details[0]['email']
    })


    res.json({message: '/order-online: the data saved in db'});
    
    } catch {
        res.json({message: 'Error from /order-online'});   
    }
}

export {orderOnlineMethod};