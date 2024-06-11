import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { login } from './login.js';
import {managerDb} from './DataBase/ManagerDB.js'
import { orderOnlineMethod } from './orderRequests.js';
import { checkEmptyTable, saveReservation} from './tableRequests.js';
import { getMenuData } from './getMenuData.js';
import { getOrdersOnline, deleteOrderByManager, getReservation, getMenu, deleteDish, changeMenu } from './managerOperations.js';
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

//* requests for Manager:
app.get('/fetchOrders', getOrdersOnline);
app.get('/fetchReservation', getReservation);
app.get('/fetchMenu', getMenu);
app.post('/deleteDish', deleteDish);
app.post('/deleteOrder', deleteOrderByManager);
app.post('/changeMenu', changeMenu);

//* POST for check empty table:
app.post('/check-emptyTable', checkEmptyTable);
app.post('/sendEmail', saveReservation);
app.post('/order-online', orderOnlineMethod);
app.post('/login', login);



app.listen(port, () => {
    console.log("Server running on port 3000.")
})
