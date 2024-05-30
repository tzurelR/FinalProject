import { managerDb } from "../Backend/DataBase/ManagerDB";

const login = (req, res) => {
    try {
        console.log(req.body);
        const dbRes = managerDb.find({email: req.body.email, password: req.body.password});
        if(dbRes) {
            res.json({message: 'Success, the manager exist'});
        } else {
            throw new Error('password or email now exist!');
        }
    } catch (error) {
        res.json({message: error})
    }
}

export {login};