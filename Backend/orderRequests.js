import { orderOnlineDb } from './DataBase/orderOnlineDB.js';
import { menuDb } from './DataBase/MenuDB.js';
import { ingredientDb } from './DataBase/IngredientsDB.js';
import { sendMail, transporter } from './sendMail.js';

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
    // names of dishes in last order
    const foodNamesArray = foodArray.map((e) => e.name);
    

    //* update ingredients:
    const menuRes = await menuDb.find({
        dishName: { $in: foodNamesArray }
    }).select('dishName ingredients');  
    menuRes.map((element, index) => {
        const count = foodArray[index].count;
        element.ingredients.map((ingredient) => {
            ingredient.ingredientAmount *= count;
        })
    });
    
    //* sum all the ingredients:
    const ingredientsArr = [];
    menuRes.map((element) => {
        element.ingredients.map((ingredient) => {
            ingredientsArr.push({name: ingredient.ingredientName, count: ingredient.ingredientAmount});
        })
    });

    //* union between the same ingredient:
    ingredientsArr.map((ingredient, index) => {
        const name = ingredient.name;
        for(let i = 0; i < ingredientsArr.length; i++) {
            if(index !== i && name === ingredientsArr[i].name) {
                ingredient.count += ingredientsArr[i].count;
                ingredientsArr.splice(i, 1);
            }
        }
    })

    //* update Ingredients 
    await updateIngredients(ingredientsArr);
    
    await orderOnlineDb.insertMany({
        invite_id: maxId,
        dishes: foodArray,
        typeOfOrder: details[0]['typeOfOrder'],
        cost: details[0]['cost'],
        statusOfOrder: 'preparing',
        email: details[0]['email']
    });

    const mailOptions = {
        from: {
            name: 'TzR',
            address: "tzurel123@gmail.com" 
        }, 
        to: `${details[0]['email']}`, // list of receivers
        subject: "Order Online in Chill&Grill", // Subject line
        text: `We are thrilled to confirm that your online order is now being processed.`,
      }
    sendMail(transporter, mailOptions);


    res.status(200).json({message: '/order-online: the data saved in db'});
        
    } catch (err) {
        res.status(500).json({message: err.message});   
    }
}

const updateIngredients = async(ingredientsArr) => {

    for(const element of ingredientsArr) {
        const item = await ingredientDb.findOne({ingredientName: element.name});
        const count = item.amount - element.count;
        if(count < 1) {
            throw new Error('there are no enough Ingredients');
        }
        await ingredientDb.findOneAndUpdate({ingredientName: element.name}, {$set: {amount: count}});
    }
}

const ingredientsShortage = (req, res) => {
    try {   
        const mailOptions = {
            from: {
                name: 'TzR',
                address: "tzurel123@gmail.com" 
            }, 
            to: `tzurel150@gmail.com`, // restaurant manager
            subject: "Ingredients Update in Chill&Grill", // Subject line
            text: req.body.message,
          }
        sendMail(transporter, mailOptions);

        res.json({message: 'The email was sent successfully.'});
    } catch (err) {
        res.json({message: err.message});
    }
}

export {orderOnlineMethod, ingredientsShortage};