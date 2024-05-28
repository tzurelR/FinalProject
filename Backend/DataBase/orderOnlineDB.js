import mongoose from "mongoose";

const orderOnlineScema = new mongoose.Schema({
    invite_id: {
        type: Number,
        required: true,
        unique: true
    },
    dishes: {
        type: [{
            name: {
                type: String,
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        }]
    },
    typeOfOrder: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    statusOfOrder: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    }
}, {collection: 'OrderOnline'})

const orderOnlineDb = mongoose.model('OrderOnline', orderOnlineScema);

export {orderOnlineDb};
    
    