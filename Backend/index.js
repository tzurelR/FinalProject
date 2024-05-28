import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { tableDb } from './DataBase/tables.js';
import { orderOnlineDb } from './DataBase/orderOnlineDB.js';
import { menuDb } from './DataBase/MenuDB.js';
import { ingredientDb } from './DataBase/IngredientsDB.js';
import { orderOnlineMethod } from './orderRequests.js';
import { checkEmptyTable, saveReservation} from './tableRequests.js';
import { getMenuData } from './getMenuData.js';
const userNameDB = 'tzurel150';
const passwordDB = 'JQGdzI57qA9hOrYJ';
const DB_URL = `mongodb+srv://tzurel150:${passwordDB}@finalproject.dtuuckj.mongodb.net/?retryWrites=true&w=majority&appName=FinalProject`;

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

mongoose.connect(DB_URL, {
    dbName: 'final_project'}).then(() => console.log("DB connection succesful!"));

app.get('/order', (req, res) => {
    res.send({'hey': 'tempo'})
})
app.get('/getMenu', getMenuData);

//* POST for check empty table:
app.post('/check-emptyTable', checkEmptyTable);
app.post('/sendEmail', saveReservation);
app.post('/order-online', orderOnlineMethod);

// menuDb.insertMany([
//     {
//         dish_id: 2,
//         dishName: 'Arais',
//         cost: 10,
//         ingredients: [{ingredientName: 'cucumber', ingredientAmount: 2},{ingredientName: 'tomato', ingredientAmount: 2},
//         {ingredientName: 'oil', ingredientAmount: 1},{ingredientName: 'lemon', ingredientAmount: 1}
//         ]
//       },
      
// ]);

app.listen(port, () => {
    console.log("Server running on port 3000.")
})
