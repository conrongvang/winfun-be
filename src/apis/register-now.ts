import express, { Request, Response } from 'express';
import { fetchAllRegisterNow, insertNewRegisterApplication, resendRegisterInfoToHostEmail } from '../db/services/register-services'
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

router.get('/all_registers', async (_req: Request, res: Response) => {
    try{
        const data = await fetchAllRegisterNow()
        res.status(200).json({code: 0, data});
    }
    catch(err){
        res.status(200).json({code: 1, message: err});
    }
});

router.post('/resend_email', async (req: Request, res: Response) => {
    try{
        const { registerId } = req.body
        const data = await resendRegisterInfoToHostEmail(registerId)
        res.status(200).json({code: 0, data});
    }
    catch(err){
        res.status(200).json({code: 1, message: err});
    }
});

export const RegisterNowAPIs = router;