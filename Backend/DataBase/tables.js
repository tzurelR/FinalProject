import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    table_id: {
        type: String,
        required: true,
        unique: true
    },
    chairNumber: {
        type: Number,
        required: true
    }, 
    invitesList: {
        type: [{
            user_email: {
                type: String,
                required: true
            },
            hour: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            } 
        }]  
    }
}, {collection: 'RestaurantTables'})


const tableDb = mongoose.model('RestaurantTables', tableSchema);

export {tableDb};

