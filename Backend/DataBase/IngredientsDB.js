import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema ({
    ingredient_id: {
        type: Number,
        required: true,
        unique: true
    },
    ingredientName: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    
}, {collection: 'Ingredients'});

const ingredientDb = mongoose.model('Ingredients', ingredientSchema);

export {ingredientDb};
