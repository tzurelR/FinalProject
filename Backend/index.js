import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { login } from './login.js';
import { orderOnlineMethod, ingredientsShortage } from './orderRequests.js';
import { checkEmptyTable, saveReservation} from './tableRequests.js';
import { getMenuData } from './getMenuData.js';
import { getOrdersOnline, deleteOrderByManager, getReservation, getMenu, deleteDish, changeMenu, getIngredients, changeIngredients, addIngredient } from './managerOperations.js';
import { getFirstMsgFromGpt, sendMsgGpt } from './chatGptRequest.js';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

mongoose.connect(DB_URL, {
    dbName: 'final_project'}).then(() => console.log("DB connection succesful!"));

app.get('/getMenu', getMenuData);

app.get('/fetchOrders', getOrdersOnline);
app.get('/fetchReservation', getReservation);
app.get('/fetchMenu', getMenu);
app.get('/fetchIngredients', getIngredients);
app.get('/firstMsgFromGpt', getFirstMsgFromGpt);
app.post('/deleteDish', deleteDish);
app.post('/deleteOrder', deleteOrderByManager);
app.post('/changeMenu', changeMenu);
app.post('/changeIngredients', changeIngredients);
app.post('/addIngredient', addIngredient);
app.post('/sendMsgToGpt', sendMsgGpt);

app.post('/check-emptyTable', checkEmptyTable);
app.post('/sendEmail', saveReservation);
app.post('/order-online', orderOnlineMethod);
app.post('/order-online/ingredients-shortage', ingredientsShortage)
app.post('/login', login);


app.listen(port, () => {
    console.log("Server running on port 3000.")
})
