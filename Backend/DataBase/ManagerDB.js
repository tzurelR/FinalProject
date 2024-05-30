import mongoose from "mongoose";

const admonSchema = new mongoose.Schema ({
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
    
}, {collection: 'Admin'});

const adminDb = mongoose.model('Admin', admonSchema);

export {adminDb};
