import mongoose from "mongoose";

const managerSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    
}, {collection: 'Manager'});

const managerDb = mongoose.model('Manager', managerSchema);

export {managerDb};
