import { managerDb } from "./DataBase/ManagerDB.js";

const login = async(req, res) => {
    try {
        const dbRes = await managerDb.find({email: req.body.email, password: req.body.password});
        //* got from mongo array, so if it's empty dbRes find nothing.
        if(dbRes.length !== 0) {
            res.json({message: 'Success, the manager exist'});
        } else {
            throw new Error('password or email now exist!');
        }
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}

export {login};