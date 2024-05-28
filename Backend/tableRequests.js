import { tableDb } from './DataBase/tables.js';
import { sendMail, transporter } from './sendMail.js';

let emptyTableId;
const checkEmptyTable = async(req, res) => {
    try{
    const hour = req.body.hour;
    const date = req.body.date;
    const countOfPeople = req.body.countOfPeople * 1;
 
    const emptyTable = await tableDb.aggregate([
            {$match: {"chairNumber": {$gte: countOfPeople}}},
            {$match: {"invitesList": {
                $not: {
                $elemMatch: {
                    "hour": hour,
                    "date": date
                    
                }
            }
            }}}
    ])
    if(emptyTable) {
        emptyTableId = emptyTable[0].table_id;
        res.status(200).json({message: `There is empty table`})
    } else {
        res.json({message: 'There is no empty table'});
    }
    } catch(err) {
        res.json({message: 'Error from /check-emptyTable'});   
    }
}

const saveReservation = async(req, res) => {
    try {
        const newReservation = {
            user_email: req.body.email,
            hour: req.body.hour,
            date: req.body.date,
            countOfPeople: req.body.countOfPeople
        }
        const temp = await tableDb.findOneAndUpdate(
            {table_id: emptyTableId}, {$push: {invitesList: newReservation}}, {new: true}
        )

        const mailOptions = {
            from: {
                name: 'TzR',
                address: "tzurel123@gmail.com" 
            }, 
            to: `${newReservation.user_email}`, // list of receivers
            subject: "Table Reservation in The Restaurant", // Subject line
            text: `We are thrilled to confirm your reservation at The Restaurant for ${newReservation.countOfPeople} guests on ${newReservation.date} at ${newReservation.hour}. Your table reservation is now secured.`, // plain text body
          }
        sendMail(transporter, mailOptions);
        res.json({message: 'The reservation saved.'});
    } catch {
        res.json({message: 'Error from /sendEmail'});   
    }
}

export {checkEmptyTable, saveReservation};