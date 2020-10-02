import express, { Request, Response } from 'express';
import { insertNewRegisterApplication } from '../db/services/register-services'
import { RegisterNow } from '../models/ModelDeclare';

const router = express.Router();

router.post('/register_now', async (req: Request, res: Response) => {
    try{
        const newRegister : RegisterNow = req.body 
        const data = await insertNewRegisterApplication(newRegister)
        res.status(200).json({code: 0, data});
    }
    catch(err){
        res.status(200).json({code: 1, message: err});
    }
});

export const RegisterNowAPIs = router;