import mongoose from "mongoose";

const menuSchema = new mongoose.Schema ({
    dish_id: {
        type: Number,
        required: true,
        unique: true
    },
    dishName: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: [{
            ingredientName: {
                type: String,
                required: true
            },
            ingredientAmount: {
                type: Number,
                required: true
            }
        }]
    }
}, {collection: 'Menu'});

const menuDb = mongoose.model('menuDb', menuSchema);

export {menuDb};
